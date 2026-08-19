const pool = require('../config/database');

const authorize = (requiredScopes) => {
    return async (req, res, next) => {
        try {
            const roleId = req.user.role_id; 

            // Scopes
            const [rows] = await pool.execute(`
                SELECT s.name 
                FROM role_scopes rs
                JOIN scopes s ON rs.scope_id = s.id
                WHERE rs.role_id = ?
            `, [roleId]);

            const userScopes = rows.map(row => row.name);

            // Verificar scopes
            const hasPermission = requiredScopes.some(scope => userScopes.includes(scope));

            if (!hasPermission) {
                return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno al verificar permisos' });
        }
    };
};

module.exports = authorize;
