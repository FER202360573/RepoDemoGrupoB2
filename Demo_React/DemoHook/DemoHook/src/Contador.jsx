import { useState } from "react";
export default function Contador(){
    const [ contador, setContador ] = useState(0);
    
    const incrementa = ()=>{setContador(contador + 1)}
    const decrementa = ()=>{setContador(contador - 1)}

    return(
        <div>
            <h2>{contador}</h2>
            <button onClick={incrementa}>incrementa</button>
            <button onClick={decrementa}>decrementa</button>
    </div>  
    );
}