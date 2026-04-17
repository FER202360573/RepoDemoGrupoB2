import { useState, useEffect } from "react";
import { PokeCard } from "./PokeCard";
import "./PokeCard.css";

export default function PokeContenedor() {
  const [listaPokemon, setListaPokemon] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [offset, setOffset] = useState(0);
  const [cargando, setCargando] = useState(false);
  const limite = 20;

  const cargarPokemones = async () => {
    setCargando(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=${offset}`);
      const data = await response.json();
      const promesas = data.results.map(async (p) => {
        const res = await fetch(p.url);
        return res.json();
      });
      const resultados = await Promise.all(promesas);
      setListaPokemon(resultados);
    } catch (err) { console.error(err); }
    finally { setCargando(false); }
  };

  const buscarUno = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) {
        cargarPokemones();
        return;
    }
    setCargando(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase().trim()}`);
      const data = await res.json();
      setListaPokemon([data]); // Mostramos solo el resultado de búsqueda
    } catch (err) {
      alert("Pokémon no encontrado");
    } finally { setCargando(false); }
  };

  useEffect(() => { cargarPokemones(); }, [offset]);

  return (
    <div className="poke-app-container">
      {/* BARRA SUPERIOR FIJA */}
      <div className="top-bar">
        <form onSubmit={buscarUno} className="poke-form">
          <input 
            type="text" 
            placeholder="Buscar por nombre o ID..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="poke-input"
          />
          <button type="submit" className="poke-button">🔍</button>
        </form>

        <div className="pagination-controls">
          <button className="nav-button" onClick={() => setOffset(Math.max(0, offset - limite))}>Anterior</button>
          <span>Página {Math.floor(offset / limite) + 1}</span>
          <button className="nav-button" onClick={() => setOffset(offset + limite)}>Siguiente</button>
        </div>
      </div>

      {cargando ? (
        <div style={{textAlign:'center', color:'white'}}>Cargando...</div>
      ) : (
        <div className="poke-grid">
          {listaPokemon.map((poke) => (
            <PokeCard key={poke.id} pokemon={poke} />
          ))}
        </div>
      )}
    </div>
  );
}