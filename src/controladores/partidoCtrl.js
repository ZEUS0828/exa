import { conmysql } from "../db.js";

// Obtener todos los partidos
export const getPartidos = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM partido");
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar partidos" });
    }
};

// Obtener un partido por ID
export const getPartidoPorId = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM partido WHERE id_par = ?", [req.params.id]);
        if (result.length <= 0) 
            return res.status(404).json({ id_par: 0, message: "Partido no encontrado" });
        
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Crear un nuevo partido
export const postPartido = async (req, res) => {
    try {
        const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body;
        const [rows] = await conmysql.query(
            "INSERT INTO partido (eq_uno, eq_dos, fecha_par, id_res, estado_par) VALUES (?, ?, ?, ?, ?)",
            [eq_uno, eq_dos, fecha_par, id_res, estado_par]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Actualizar un partido
export const putPartido = async (req, res) => {
    try {
        const { id } = req.params;
        const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body;
        const [result] = await conmysql.query(
            "UPDATE partido SET eq_uno = ?, eq_dos = ?, fecha_par = ?, id_res = ?, estado_par = ? WHERE id_par = ?",
            [eq_uno, eq_dos, fecha_par, id_res, estado_par, id]
        );

        if (result.affectedRows <= 0) 
            return res.status(404).json({ message: "Partido no encontrado" });
        
        const [rows] = await conmysql.query("SELECT * FROM partido WHERE id_par = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Actualizar parcialmente un partido
export const patchPartido = async (req, res) => {
    try {
        const { id } = req.params;
        const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body;
        const [result] = await conmysql.query(
            `UPDATE partido SET 
                eq_uno = IFNULL(?, eq_uno),
                eq_dos = IFNULL(?, eq_dos),
                fecha_par = IFNULL(?, fecha_par),
                id_res = IFNULL(?, id_res),
                estado_par = IFNULL(?, estado_par)
            WHERE id_par = ?`,
            [eq_uno, eq_dos, fecha_par, id_res, estado_par, id]
        );

        if (result.affectedRows <= 0) 
            return res.status(404).json({ message: "Partido no encontrado" });
        
        const [rows] = await conmysql.query("SELECT * FROM partido WHERE id_par = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// Eliminar un partido
export const deletePartido = async (req, res) => {
    try {
        const [rows] = await conmysql.query("DELETE FROM partido WHERE id_par = ?", [req.params.id]);
        if (rows.affectedRows <= 0) 
            return res.status(404).json({ id_par: 0, message: "No se pudo eliminar el partido" });
        
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
