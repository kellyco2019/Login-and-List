import { Link } from 'react-router-dom'


function Pokemon({ name, handleFavorite }) {
  return (
    <div>
      <h2>{name}</h2>
      <Link to={`/pokemon/${name}`}>Ver más</Link>
      <button
        onClick={() => handleFavorite(name)}
      >Add to Favorite </button>
    </div>
  )
}
export default Pokemon
