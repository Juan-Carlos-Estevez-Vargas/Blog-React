import { db } from "../db.js";

export const register = (request, response) => {
  // Verificar que el usuario no exista
  const query = "SELECT * FROM user WHERE email = ? OR username = ?";
  console.log(request.body);
  console.log(query);

  db.query(
    query,
    [request.body.email, request.body.username],
    (error, data) => {
      if (error) response.status(500).json({ error });
      if (data.length)
        return response.status(409).json({ message: "User already exists" });

      // Encriptación de la contraseña
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(request.body.password, salt);

      // Creación del usuario en la abse de datos
      const query = "INSERT INTO users (email, username, password) VALUES (?)";
      const values = [[request.body.email, request.body.username, hash]];
      db.query(query, values, (error, data) => {
        if (error) response.status(500).json({ error });
        response.status(201).json({ message: "User created" });
      });
    }
  );
};

export const login = (request, response) => {};

export const logout = (request, response) => {};
