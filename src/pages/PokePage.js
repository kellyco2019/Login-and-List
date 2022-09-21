import React from "react";
import axios from 'axios'
import LoadError from "../components/LoadError";
import Loading from "../components/Loading";


class PokePage extends React.Component {
  state = {
    loading : true,
    pokemon : {},
    error: false
  }

  componentDidMount(){
    this.getPokemon();
  }


  getPokemon = () => {
    axios ({ 
      method: 'GET',
      baseURL: "https://pokeapi.co/api/v2/",
      url : `pokemon/${this.props.match.params.name}`,
      })
      .then(res => {
      this.setState({
        pokemon: res.data,
        loading: false,
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        err: true,
        loading: false,
      })
    })
  }

  render(){
   const { pokemon , loading , error} = this.state;
   if(loading) return <Loading />
    if(error) return <LoadError />    
     return(
      <div>
        <p>   Name: {pokemon.name}</p>
        <img  alt="pokemon" src={pokemon.sprites['front_shiny']}></img>
      </div>
    )
  }
}
export default PokePage