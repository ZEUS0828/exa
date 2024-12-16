import { conmysql } from '../db.js';

// Obtener todos los pronósticos
export const getPronosticos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pronostico');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar pronósticos" });
    }
};

// Obtener un pronóstico por ID
export const getPronosticoPorId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pronostico WHERE id_pron = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            id_pron: 0,
            message: "Pronóstico no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo pronóstico
export const postPronostico = async (req, res) => {
    try {
        const { id_usr, id_par, id_res, valor } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES (?, ?, ?, ?, NOW())',
            [id_usr, id_par, id_res, valor]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error al insertar el pronóstico' });
    }
};

// Actualizar un pronóstico
export const putPronostico = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usr, id_par, id_res, valor } = req.body;
        const [result] = await conmysql.query(
            'UPDATE pronostico SET id_usr = ?, id_par = ?, id_res = ?, valor = ? WHERE id_pron = ?',
            [id_usr, id_par, id_res, valor, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Pronóstico no encontrado" });
        const [rows] = await conmysql.query('SELECT * FROM pronostico WHERE id_pron = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar parcialmente un pronóstico
export const patchPronostico = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usr, id_par, id_res, valor } = req.body;
        const [result] = await conmysql.query(
            `UPDATE pronostico SET 
                id_usr = IFNULL(?, id_usr),
                id_par = IFNULL(?, id_par),
                id_res = IFNULL(?, id_res),
                valor = IFNULL(?, valor)
            WHERE id_pron = ?`,
            [id_usr, id_par, id_res, valor, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Pronóstico no encontrado" });
        const [rows] = await conmysql.query('SELECT * FROM pronostico WHERE id_pron = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Eliminar un pronóstico
export const deletePronostico = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM pronostico WHERE id_pron = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({
            id_pron: 0,
            message: "No se pudo eliminar el pronóstico"
        });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
