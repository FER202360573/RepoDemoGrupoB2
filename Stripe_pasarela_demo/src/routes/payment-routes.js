import { Router } from "express";
import crearSesionPago from "../controllers/pago-controller.js";

const router = Router();

router.get("/pagar" , crearSesionPago);
router.get("/exito", (req, res)=>res.send("Exito en el pago"));
router.get("/cancelado", (req, res)=>res.send("Pago cancelado"));
export default router;