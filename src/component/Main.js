import React, { Component } from 'react'
import LoadingGif from "../images/loading.gif"
import PawImg from "../images/paw.png"
import "./Main.scss"

const DEFAULT_DOG = "pug"

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dogs: null,
            breeds: null,
            dogName: DEFAULT_DOG
        }
    }

    async componentDidMount() {
        const url = "https://dog.ceo/api/breed/pug/images"
        fetch(url)
        .then((response) => response.json())
        .then((dogs) => this.setState({dogs: dogs.message}));

        const urlAll = "https://dog.ceo/api/breeds/list/all"
        fetch(urlAll)
        .then((responseAll) => responseAll.json())
        .then((breeds) => this.setState({breeds: Object.keys(breeds.message)}));
    }

    filtedBreed = name => {
        name = name.toLowerCase()
        let url = "https://dog.ceo/api/breed/" + name + "/images"
        fetch(url)
        .then((response) => response.json())
        .then((dogs) => this.setState({dogs: dogs.message, dogName: name}));
    }

    render() {
        let breeds = this.state.breeds
        let dogs = this.state.dogs
        if(!dogs || !breeds) {
            return (
                <div className="loading">
                    <img className="loading-gif" src={LoadingGif} alt="Loading gif"/>
                </div>
            )
        }
        else {
            return (
                <React.Fragment>
                    <div className="header">
                        <div className="header-wrap">
                            <img className="paw-img" src={PawImg} alt="Paw"/>
                            DOGGIE BROWSER
                            <img className="paw-img right" src={PawImg} alt="Paw"/>
                        </div>
                        <div className="sub-header">
                            what's your favorite breed of dog?
                        </div>
                    </div>
                    <div className="filter">
                        <div className="filter-txt">FILTER BY BREED: </div>
                        <select id="breeds" name="breeds" defaultValue={'DEFAULT'} onChange={e => this.filtedBreed(e.target.value)}>
                            {breeds.map( name => (
                                <option value={name === DEFAULT_DOG ? "DEFAULT" : name.charAt(0).toUpperCase() + name.slice(1)} key={name}>
                                    {name.charAt(0).toUpperCase() + name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="dogs">
                        <div className="info">
                            {this.state.dogName.toUpperCase()}
                            <div className="total">
                                {dogs.length}{" "}Results
                            </div>
                        </div>
                        {dogs.map(item => (
                            <img className="dog-img" src={item} alt="Dog" key={item}/>
                        ))}
                    </div>
                </React.Fragment>
            )
        }
    }
}
