import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (request, response) => {
  const query = request.query.categoria
    ? "SELECT * FROM posts WHERE category = ?"
    : "SELECT * FROM posts";

  db.query(query, [request.query.categoria], (error, data) => {
    if (error) response.status(500).json({ error });
    response.status(200).json(data);
  });
};

export const getPost = (request, response) => {
  const query =
    "SELECT p.id, username, title, description, p.img, u.img AS userImg, category, date FROM user u JOIN posts p ON u.id = p.userid WHERE p.id = ?";
  db.query(query, [request.params.id], (error, data) => {
    if (error) response.status(500).json({ error });
    response.status(200).json(data);
  });
};

export const addPost = (request, response) => {
  // Verificar el token JWT
  const authorizationHeader = request.headers.authorization;
  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "No autorizado" });
  }

  jwt.verify(token, "jwtkey", (error, user) => {
    if (error) return response.status(403).json({ message: "Token invalido" });

    let query =
      "INSERT INTO posts (title, description, category, userid) VALUES (?, ?, ?, ?)";
    let values = [
      request.body.title,
      request.body.description,
      request.body.category,
      user.id,
    ];

    // Verifica si se proporcionó una imagen antes de agregarla a la consulta
    if (request.body.img) {
      query =
        "INSERT INTO posts (title, description, category, img, userid) VALUES (?, ?, ?, ?, ?)";
      values.push(request.body.img);
    }

    db.query(query, values, (error, data) => {
      if (error) {
        response.status(500).json({ error });
      } else {
        response.status(200).json({ message: "Post agregado" });
      }
    });
  });
};

export const deletePost = (request, response) => {
  // Verificar el token JWT
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return response.status(401).json({ message: "No autorizado" });
  }

  const token = authorizationHeader.split(" ")[1]; // Divide el encabezado para obtener el token

  if (!token) {
    return response.status(401).json({ message: "No autorizado" });
  }

  jwt.verify(token, "jwtkey", (error, user) => {
    if (error) return response.status(403).json({ message: "Token invalido" });

    const postId = request.params.id;
    const query = "DELETE FROM posts WHERE id = ? AND userid = ?";

    db.query(query, [postId, user.id], (error, data) => {
      if (error)
        response
          .status(403)
          .json({ message: "Solo puedes eliminar tus posts" });
      return response.status(200).json({ message: "Post eliminado" });
    });
  });
};

export const updatePost = (request, response) => {
  // Verificar el token JWT
  const authorizationHeader = request.headers.authorization; // Obtiene el valor del encabezado 'Authorization'
  const token = authorizationHeader.split(" ")[1]; // Divide el encabezado para obtener el token

  if (!token) {
    return response.status(401).json({ message: "No autorizado" });
  }

  jwt.verify(token, "jwtkey", (error, user) => {
    if (error) return response.status(403).json({ message: "Token invalido" });

    const postId = request.params.id;

    const query =
      "UPDATE posts SET title = ?, description = ?, category = ?, img = ? WHERE id = ? AND userid = ?";

    const values = [
      request.body.title,
      request.body.description,
      request.body.category,
      request.body.img,
      user.id,
    ];

    db.query(query, [...values, postId, user.id], (error, data) => {
      if (error) response.status(500).json({ error });
      return response.status(200).json({ message: "Post actualizado" });
    });
  });
};
