import React from "react";
import axios from 'axios'
import LoadError from "../components/LoadError";
import Loading from "../components/Loading";
import Pokemon from "../components/Pokemon";
import Pagination from "../components/pagination";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
class PokeList extends React.Component {

  state = {
    loading : true,
    pokeList : [],
    currentOffset: 0,
    error: false,
    logeado: ""
  }
 static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };


  componentDidMount(){
      this.getLogin()
    
  }

  componentDidUpdate (prevProps, prevState) {
    const { currentOffset } = this.state 
    if (currentOffset !== prevState.currentOffset) {
      if( currentOffset < 0 ) {
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
    axios ({ 
      method: 'GET',
      baseURL: "https://pokeapi.co/api/v2/pokemon",
      params   })
    .then(res => {
    const { results } = res.data
      console.log(res)
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

  increment = () => {
    const { currentOffset} = this.state;
    this.setState({
      currentOffset: currentOffset + 20
    })
  }

  decrement = () => {
    const { currentOffset} = this.state;
    this.setState({
      currentOffset: currentOffset - 20
    })

  }

  render(){
   const { pokeList, currentOffset ,loading , error} = this.state;
    if(loading) return <Loading />
    if(error) return <LoadError />    
    console.log(currentOffset)
     return(

      <div>
        <Pagination increment={this.increment} decrement={this.decrement}/>
    <main>
  {!!pokeList && pokeList.length > 0 && pokeList.map(( { name } ) => (
         <Pokemon
          key={name}
          name={name}
      />  
      ))}
</main>

      </div>

    )
  }
}
export default PokeList