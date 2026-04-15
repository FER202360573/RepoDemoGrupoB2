import { useState } from "react";
export default function Demo(){
    var [nombre, setNombre ]= useState("Perro");
    return(
        <div>
            <h2>{nombre}</h2>
            <button onClick={()=>{
                /*if (nombre=== "Perro"){
                    setNombre("Guayo")
                }
                else{
                    setNombre("Perro");
                } */
               nombre === "Perro" ? setNombre("Guayo") : setNombre("Perro");
            }}>
                Click me 
            </button>
        </div>
    );
}
    
