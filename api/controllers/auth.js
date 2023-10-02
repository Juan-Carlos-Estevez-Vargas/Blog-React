import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = (request, response) => {
  // Verificar que el usuario no exista
  const query = "SELECT * FROM user WHERE email = ? OR username = ?";
  console.log(request.body);

  db.query(
    query,
    [request.body.email, request.body.username],
    (error, data) => {
      if (error) response.status(500).json({ error });
      if (data.length)
        return response.status(409).json({ message: "El usuario ya existe" });

      // Encriptación de la contraseña
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(request.body.password, salt);

      // Creación del usuario en la abse de datos
      const query = "INSERT INTO user (email, username, password) VALUES (?)";
      const values = [[request.body.email, request.body.username, hash]];
      db.query(query, values, (error, data) => {
        if (error) response.status(500).json({ error });
        response.status(201).json({ message: "Usuario creado" });
      });
    }
  );
};

export const login = (request, response) => {
  // Verificar si el usuario existe
  const query = "SELECT * FROM user WHERE username = ?";

  db.query(query, [request.body.username], (error, data) => {
    if (error) response.status(500).json({ error });
    if (data.length === 0)
      return response.status(404).json({ message: "Usuario no encontrado" });

    // Verificar la contraseña
    const isPasswordCorrect = bcrypt.compareSync(
      request.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return response.status(401).json({ message: "Contrasena incorrecta" });

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    // Enviar el token como parte de la respuesta JSON
    response
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ other, token }); // Aquí agregamos el token al objeto JSON
  });
};

export const logout = (request, response) => {
  response
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ message: "Sesión cerrada" });
};
