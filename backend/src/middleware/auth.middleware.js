const jwt = require("jsonwebtoken");

function authenticate(req,res,next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            message: "Token requerido"
        });
    }

    const token =
        header.split(" ")[1];

    try {
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Token inválido"
        });
    }
}

module.exports = authenticate;