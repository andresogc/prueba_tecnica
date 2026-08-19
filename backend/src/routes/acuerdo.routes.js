const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const acuerdoController = require("../controllers/acuerdo.controller");

// Todos los endpoints de acuerdos requieren estar autenticados
router.use(authenticate);

//lista acuerdos
router.get(
    "/",
    authorize(['leer_acuerdos', 'crear_acuerdos']),
    acuerdoController.getAcuerdos
);

//crear acuerdo
router.post(
    "/",
    authorize(['crear_acuerdos']),
    acuerdoController.createAcuerdo
);

//editar acuerdo
router.patch(
    "/:id/estado",
    authorize(['leer_acuerdos', 'crear_acuerdos']),
    acuerdoController.updateEstado
);

module.exports = router;