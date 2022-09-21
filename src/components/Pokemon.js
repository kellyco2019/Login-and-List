import { Link } from 'react-router-dom'

function Pokemon({ name}) {
  return (
    <div>
      <h2>{name}</h2>
      <Link to={`/pokemon/${name}`}>Ver más</Link> 
    </div>
  )
}

export default Pokemon
