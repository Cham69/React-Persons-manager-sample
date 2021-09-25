import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'

class App extends Component {

  constructor(props){
    super(props)
    console.log('[App.js] constructor')
  }
  state = {
    person:[
      {id: '12fg', name: 'Chamaka', age:26},
      {id: '12fgg', name: 'John', age:28},
      {id: '12fgh',name:'Doe', age:30}
    ],
    otherPerson: 'Something else',
    showPerson: false
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props)
    return state
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount')
  }

  //Changing the name based on user inputs
  nameChangeHandler = (event, id) =>{
    const personIndex = this.state.person.findIndex(
      p => {return p.id === id}
    )

    const newPerson = {...this.state.person[personIndex]}
    newPerson.name = event.target.value

    const person = [...this.state.person]
          person[personIndex] = newPerson 
    this.setState({
      person: person
    })
    //console.log(person)
  }

  //Name delete handler method
  deletePerson = (index) => {
    const person = [...this.state.person]
    person.splice(index, 1)
    this.setState({person: person})
    //console.log(person)
  }

//Name changing method
nameDisplayHandler = () => {
  const currentState = this.state.showPerson
  this.setState({showPerson: !currentState})
  //console.log(this.state.showPerson)
}

  
  render() {
    console.log('[App.js] rendering...')
    let person = null

    if(this.state.showPerson){
      person = (
          <Persons 
            person = {this.state.person}
            clicked = {this.deletePerson}
            changed = {this.nameChangeHandler}/>
      )
    }

      return (
        <div className={classes.App}>
          <Cockpit 
            title = {this.props.appTitle}
            showPersons = {this.state.showPerson}
            person = {this.state.person}
            clicked = {this.nameDisplayHandler}/>
          {person}
        </div>
      );
  }
}

export default App;