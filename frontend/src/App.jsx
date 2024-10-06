import './App.css'
import ClassBasedComponent from './class_comp_example'
import PropTypes from 'prop-types'
import { useState } from 'react'

function App() {
  
  return (
    <>
      <div className="App">
      <ClassBasedComponent title = "Class Based Component 1 (This was set using properties)"/>
      <FunctionBasedComponent1 text="Property 1" num= {3453}/>
      <FunctionBasedComponent1 text="Property 1"/>
      <FunctionBasedComponent2 text="Property 2"/>
      <StateUpdater/>
      </div>
      
    </>
  )
}

//properties accepted this way are immutable 
function FunctionBasedComponent1(props) {
  const display = props.text
  return (
    <>
      <div>
        <h1>{display}</h1>
        <p>{props.num}</p>
        <hr></hr>
      </div>
      
    </>
  )
}

FunctionBasedComponent1.defaultProps = {
  text: "default", 
  num: -1

}

FunctionBasedComponent1.propTypes = {
  text: PropTypes.string,
  num: PropTypes.number
}



//properties accepted this allows mutability
function FunctionBasedComponent2({text, num}) {
  text = "Property 2 (mutable)"
  return (
    <>
      <div>
        <h1>{text}</h1>
        <h1>{num}</h1>
        <hr></hr>
      </div>
      
    </>
  )
}

function StateUpdater() {
  const [title, setTitle] = useState("")
  const [counter, setCounter] = useState(0)

  const updateTitleClicked = () => {
    setTitle("NEW TITLE WOHOOO!");
  };

  const updateCounterClicked = () => {
    setCounter(counter + 1);
  };


  return (
    <>
      <div>
        <h1>State Practice</h1>
        <h2>State Updater/Sender</h2>
        <p>This component updates and stores the state of the title and counter variables and sends them to the reciever component below as props to be rendered.</p>
        <hr></hr>
        <StateReciever title = {title} counter = {counter}/>
        <button onClick={updateTitleClicked}>Update Title</button>
        <button onClick={updateCounterClicked}>Update Count</button>
        <hr></hr>
      </div>
      
    </>
  )
}


function StateReciever(props) {

  return (
    <>
      <div>
        <h2>State Reciever</h2>
        <p>Refresh the page to reset the state on the properties below.</p>
        <p>Title: {props.title} </p>
        <p>Count: {props.counter} </p>
      </div>
      
    </>
  )
}
export default App
