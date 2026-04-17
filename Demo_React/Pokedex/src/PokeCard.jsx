export function PokeCard({ pokemon }) {
  // Colores según el tipo principal para que se vea más bonito
  const tipoPrincipal = pokemon.types[0].type.name;
  
  const colores = {
    fire: "#FDDFDF", grass: "#DEFDE0", electric: "#FCF7DE", 
    water: "#DEF3FD", ground: "#f4e7da", rock: "#d5d5d4", 
    fairy: "#fceaff", poison: "#98d7a5", bug: "#f8d5a3", 
    dragon: "#97b3e6", psychic: "#eaeda1", flying: "#F5F5F5", 
    fighting: "#E6E0D4", normal: "#F5F5F5"
  };

  const bgStyle = {
    backgroundColor: colores[tipoPrincipal] || "#F5F5F5"
  };

  return (
    <div className="poke-card" style={bgStyle}>
      <div className="poke-card-header">
        <span className="poke-card-name">{pokemon.name.toUpperCase()}</span>
        <span className="poke-card-hp">HP {pokemon.stats[0].base_stat}</span>
      </div>

      <div className="poke-card-image-bg">
        <img 
          src={pokemon.sprites.other["official-artwork"].front_default} 
          alt={pokemon.name} 
          className="poke-card-img" 
        />
      </div>

      <div className="poke-card-info">
        <p><strong>#{pokemon.id}</strong></p>
        <p className="poke-card-types">
          {pokemon.types.map(t => t.type.name).join(" / ")}
        </p>
      </div>

      <div className="poke-card-stats">
        <span>⚔️ {pokemon.stats[1].base_stat}</span>
        <span>🛡️ {pokemon.stats[2].base_stat}</span>
      </div>
    </div>
  );
}