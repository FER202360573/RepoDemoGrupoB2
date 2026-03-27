import Stripe from "stripe";
import { SECRET_STRIPE } from "../config.js";

const stripe = new Stripe(SECRET_STRIPE);

const crearSesionPago = async (req, res) =>{
    const sesion = await stripe.checkout.sessions.create({
        line_items:[
            {   
                price_data: {
                product_data:{
                    name:'Pecera mediana',
                    description: 'Tamanño de 16x7 cm',
                },
                currency:'mxn',
                unit_amount: 1000,
                },
                quantity:4,
            },// un producto para vender
           
        ],
        mode:"payment",
        success_url:'http://localhost:4000/exito',
        cancel_url:'http://localhost:4000/cancelado',
    });
    res.json(sesion);
};

 export default crearSesionPago;