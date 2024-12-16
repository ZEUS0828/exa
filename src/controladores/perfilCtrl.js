import { conmysql } from "../db.js";

// Obtener todos los perfiles
export const getPerfiles = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM perfil");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar perfiles" });
    }
};

// Obtener un perfil por ID
export const getPerfilPorId = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM perfil WHERE per_id = ?", [req.params.id]);
        if (result.length <= 0) 
            return res.status(404).json({ per_id: 0, message: "Perfil no encontrado" });
        
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Crear un nuevo perfil
export const postPerfil = async (req, res) => {
    try {
        const { descripcion, estado } = req.body;
        const [rows] = await conmysql.query(
            "INSERT INTO perfil (descripcion, estado) VALUES (?, ?)",
            [descripcion, estado]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Actualizar un perfil
export const putPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, estado } = req.body;
        const [result] = await conmysql.query(
            "UPDATE perfil SET descripcion = ?, estado = ? WHERE per_id = ?",
            [descripcion, estado, id]
        );

        if (result.affectedRows <= 0) 
            return res.status(404).json({ message: "Perfil no encontrado" });
        
        const [rows] = await conmysql.query("SELECT * FROM perfil WHERE per_id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Actualizar parcialmente un perfil
export const patchPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, estado } = req.body;
        const [result] = await conmysql.query(
            `UPDATE perfil SET 
                descripcion = IFNULL(?, descripcion), 
                estado = IFNULL(?, estado) 
            WHERE per_id = ?`,
            [descripcion, estado, id]
        );

        if (result.affectedRows <= 0) 
            return res.status(404).json({ message: "Perfil no encontrado" });
        
        const [rows] = await conmysql.query("SELECT * FROM perfil WHERE per_id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Eliminar un perfil
export const deletePerfil = async (req, res) => {
    try {
        const [rows] = await conmysql.query("DELETE FROM perfil WHERE per_id = ?", [req.params.id]);
        if (rows.affectedRows <= 0) 
            return res.status(404).json({ per_id: 0, message: "No se pudo eliminar el perfil" });
        
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
