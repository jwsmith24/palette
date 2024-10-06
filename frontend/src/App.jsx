import './App.css'
import ClassBasedComponent from './class_comp_example'
import PropTypes from 'prop-types'
import { useState } from 'react'

function App() {
  
  return (
    <>
      <div className="App">
      <ClassBasedComponent title = "Class Based Component 1 (This was set using properties)"/>
      <FunctionBasedComponent1 text="property 1" num= {3453}/>
      <FunctionBasedComponent1 text="property 1"/>
      <FunctionBasedComponent2 text="property 2"/>
      <StatePractce/>
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
  text = "property 2 (mutable)"
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

function StatePractce() {
  const [title, setTitle] = useState("")
  const [counter, setCounter] = useState(0)

  const updateTitleClicked = () => {
    setTitle("NEW TITLE WOHOOO! (refresh the page to reset to blank)");
  };

  const updateCounterClicked = () => {
    setCounter(counter + 1);
  };


  return (
    <>
      <div>
        <h1>State Practice</h1>
        <p>Title: {title} </p>
        <p>Counter: {counter} </p>
        <button onClick={updateTitleClicked}>Update Title</button>
        <button onClick={updateCounterClicked}>Update Counter</button>
        <hr></hr>
      </div>
      
    </>
  )
}
export default App
