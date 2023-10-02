import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import { PORT, FRONT_URL } from "./config.js";

const app = express();

const corsOrigin = {
  origin: FRONT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOrigin));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Directorio relativo a la ubicación del servidor en Vercel
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se encontró ningún archivo" });
  }

  const img = req.file;
  res.status(200).json(img.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Conectado");
});
