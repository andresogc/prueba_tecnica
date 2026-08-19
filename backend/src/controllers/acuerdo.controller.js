const pool = require('../config/database');


const getAcuerdos = async (req, res) => {
    try {
        const [acuerdos] = await pool.execute('SELECT * FROM acuerdos ORDER BY fecha_creacion DESC');
        return res.json(acuerdos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los acuerdos' });
    }
};


const createAcuerdo = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;

        if (!titulo || !descripcion) {
            return res.status(400).json({ message: 'El título y la descripción son requeridos' });
        }

        // creador
        const creada_por = req.user.id;
        const estado = 'Pendiente'; 

        const [result] = await pool.execute(
            'INSERT INTO acuerdos (titulo, descripcion, estado, creada_por) VALUES (?, ?, ?, ?)',
            [titulo, descripcion, estado, creada_por]
        );

        return res.status(201).json({ 
            message: 'Acuerdo creado exitosamente',
            acuerdoId: result.insertId 
        });
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({ message: 'Error al crear el acuerdo' });
    }
};


const updateEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ message: 'El estado es requerido' });
        }

        const [result] = await pool.execute(
            'UPDATE acuerdos SET estado = ? WHERE id = ?',
            [estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Acuerdo no encontrado' });
        }

        return res.json({ message: 'Estado del acuerdo actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el estado' });
    }
};

module.exports = {
    getAcuerdos,
    createAcuerdo,
    updateEstado
};
