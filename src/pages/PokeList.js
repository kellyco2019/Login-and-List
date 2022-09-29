import React from "react";
import axios from 'axios'
import LoadError from "../components/LoadError";
import Loading from "../components/Loading";
import Pokemon from "../components/Pokemon";
import Pagination from "../components/pagination";
import PropTypes from "prop-types";

class PokeList extends React.Component {

  state = {
    loading: true,
    pokeList: [],
    currentOffset: 0,
    error: false,
    pokeLove: []
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.getLogin()
    this.getFavorite()
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentOffset } = this.state
    if (currentOffset !== prevState.currentOffset) {
      if (currentOffset < 0) {
        this.getData(prevState.currentOffset);
        this.setState({
          currentOffset: 0
        })
      }
      this.getData(currentOffset);
    }
  }

  getLogin = () => {
    const { history } = this.props;
    const hasEmail = localStorage.getItem('email');
    const hasPassword = localStorage.getItem('password')
    if (hasEmail && hasPassword) {
      this.getData()
    } else {
      history.push("/login");
    }
  }

  getData = (offset) => {
    let params = {
      offset: offset,
      limit: 20,
    }
    axios({
      method: 'GET',
      baseURL: "https://pokeapi.co/api/v2/pokemon",
      params
    })
      .then(res => {
        const { results } = res.data
        this.setState({
          pokeList: results,
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

  getFavorite = () => {
    const favorite = localStorage.getItem('favPokemon');
    return JSON.parse(favorite)
  }

  increment = () => {
    const { currentOffset } = this.state;
    this.setState({
      currentOffset: currentOffset + 20
    })
  }

  decrement = () => {
    const { currentOffset } = this.state;
    this.setState({
      currentOffset: currentOffset - 20
    })

  }
  //favorite
  addToFavorite = (name) => {
    const data = this.state.pokeList.find((item) => item.name === name);
    const filterData = this.state.pokeList.filter((item) => item.name !== name)
    this.setState({
      pokeLove: [...this.state.pokeLove, data],
      pokeList: [...filterData]
    });
    if (data) {
      localStorage.setItem('favPokemon', JSON.stringify(this.state.pokeLove));
    }
  };

  deleteToFavorite = (name) => {
    const filterData = this.state.pokeLove.filter((item) => item.name !== name);
    const data = this.state.pokeLove.find((item) => item.name === name);
    this.setState({ 
      pokeLove: filterData,
      pokeList: [...this.state.pokeList, data]
    });
  };

  render() {
    const { pokeList, favorite2, pokeLove, loading, error } = this.state;
    if (loading) return <Loading />
    if (error) return <LoadError />

    return (
      <div>
        <Pagination increment={this.increment} decrement={this.decrement} />
        <main>
          {!!pokeList && pokeList.length > 0 && pokeList.map(({ name }) => (
            <Pokemon
              key={name}
              name={name}
              handleFavorite={this.addToFavorite}
            />
          ))}
        </main>
        <div>
          <h2>Favorites</h2>

          {!!pokeLove && pokeLove.length > 0 && pokeLove.map(({ name }) => (
            <article key={name}>
              <h2>Name:{name}</h2>
              <button
               onClick={() => this.deleteToFavorite(name)}
              >
                Delete 
              </button>
            </article>
          ))
          }
        </div>
      </div>
    )
  }
}
export default PokeList