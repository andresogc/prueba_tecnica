const jwt = require('jsonwebtoken');
const pool = require('../config/database');


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar request
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        // 1. Conseguir el usuario 
        const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = users[0];

        // 2. Comprobar la contraseña 
        
        if (password !== user.password) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        
        const token = jwt.sign(
            { 
                id: user.id, 
                role_id: user.role_id 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }
        );

        
        return res.json({
            message: 'Login correcto',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    login
};