import { db } from "../db.js";

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

export const deletePost = (request, response) => {};

export const updatePost = (request, response) => {};
