import { conmysql } from "../db.js";

// Obtener todos los equipos
export const getEquipos = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM equipo");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar equipos" });
    }
};

// Obtener un equipo por ID
export const getEquipoPorId = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM equipo WHERE id_eq = ?", [req.params.id]);
        if (result.length <= 0) 
            return res.status(404).json({ id_eq: 0, message: "Equipo no encontrado" });
        
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Crear un nuevo equipo
export const postEquipo = async (req, res) => {
    try {
        const { nombre_eq, ciudad_eq } = req.body;
        const [rows] = await conmysql.query(
            "INSERT INTO equipo (nombre_eq, ciudad_eq) VALUES (?, ?)",
            [nombre_eq, ciudad_eq]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Actualizar un equipo
export const putEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_eq, ciudad_eq } = req.body;
        const [result] = await conmysql.query(
            "UPDATE equipo SET nombre_eq = ?, ciudad_eq = ? WHERE id_eq = ?",
            [nombre_eq, ciudad_eq, id]
        );

        if (result.affectedRows <= 0) 
            return res.status(404).json({ message: "Equipo no encontrado" });
        
        const [rows] = await conmysql.query("SELECT * FROM equipo WHERE id_eq = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Actualizar parcialmente un equipo
export const patchEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_eq, ciudad_eq } = req.body;
        const [result] = await conmysql.query(
            `UPDATE equipo SET 
                nombre_eq = IFNULL(?, nombre_eq), 
                ciudad_eq = IFNULL(?, ciudad_eq) 
            WHERE id_eq = ?`,
            [nombre_eq, ciudad_eq, id]
        );

        if (result.affectedRows <= 0) 
            return res.status(404).json({ message: "Equipo no encontrado" });
        
        const [rows] = await conmysql.query("SELECT * FROM equipo WHERE id_eq = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Eliminar un equipo
export const deleteEquipo = async (req, res) => {
    try {
        const [rows] = await conmysql.query("DELETE FROM equipo WHERE id_eq = ?", [req.params.id]);
        if (rows.affectedRows <= 0) 
            return res.status(404).json({ id: 0, message: "No se pudo eliminar el equipo" });
        
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
