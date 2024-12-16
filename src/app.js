import cors from "cors"; // Importa cors para manejar permisos de acceso
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Importa las rutas necesarias
import resultadoRoutes from "./routes/resultado.routes.js"; // Importa las rutas para resultado
import equipoRoutes from "./routes/equipo.routes.js"; // Importa las rutas para equipo
import partidoRoutes from "./routes/partido.routes.js"; // Importa las rutas para partido
import perfilRoutes from "./routes/perfil.routes.js"; // Importa las rutas para perfil
import usuarioRoutes from "./routes/usuario.routes.js"; // Importa las rutas para usuario
import pronosticoRoutes from "./routes/pronostico.routes.js"; // Importa las rutas para pronóstico

// Define el módulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: "*", // Permite todas las IPs
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, // Permite credenciales
};

app.use(cors(corsOptions)); // Aplica configuración de CORS
app.use(express.json()); // Permite interpretar JSON en el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true })); // Permite interpretar formularios codificados

// Rutas
app.use("/api", resultadoRoutes);  // Rutas para resultados
app.use("/api", equipoRoutes);  // Rutas para equipos
app.use("/api", partidoRoutes);  // Rutas para partidos
app.use("/api", perfilRoutes);  // Rutas para perfiles
app.use("/api", usuarioRoutes);  // Rutas para usuarios
app.use("/api", pronosticoRoutes);  // Rutas para pronósticos

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
});

export default app;
