import tlacua from '../imagenes/tlacua.jpg'
import tlacuaAgua from '../imagenes/tlacuaAgua.jpg'
import tlacuaSepa from '../imagenes/tlacuaSepa.jpg'
import '../estilos/Tarjeta.css'

const imagenes={
    tlacua,tlacuaAgua,tlacuaSepa
}

function Tarjeta(props){
    return(
        <div className='contenedor-tarjeta'>
            <img className="imagen-tarjeta"
            src={imagenes[props.imagen]} 
            alt="Marsupiales ${props.nombre}" />
            <div className="contenedor-texto-tarjeta">
                <p className="titulo-tarjeta">
                    <strong>{props.nombre}</strong>
                </p>
                <p className="subtitulo-tarjeta">
                    {props.cientifico}
                </p>
                <p className="texto-tarjeta">
                    {props.texto}
                </p>
            </div>
        </div>
    );
}

export default Tarjeta;