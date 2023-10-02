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
    "SELECT username, title, description, p.img, u.img AS userImg, category, date FROM user u JOIN posts p ON u.id = p.userid WHERE p.id = ?";
  db.query(query, [request.params.id], (error, data) => {
    if (error) response.status(500).json({ error });
    response.status(200).json(data);
  });
};

export const addPost = (request, response) => {};

export const deletePost = (request, response) => {
  // Verificar el token JWT
  const token = request.cookies.access_token;
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

export const updatePost = (request, response) => {};
