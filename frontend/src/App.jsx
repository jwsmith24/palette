import './App.css'
import ClassBasedComponent from './class_comp_example'
import PropTypes from 'prop-types'

function App() {
  
  return (
    <>
      <div className="App">
      <ClassBasedComponent title = "Class Based Component 1 (This was set using properties)"/>
      <FunctionBasedComponent1 text="property 1" num= {3453}/>
      <FunctionBasedComponent1 text="property 1"/>
      <FunctionBasedComponent2 text="property 2"/>
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
      </div>
      
    </>
  )
}

FunctionBasedComponent1.defaultProps = {
  text: "default", 
  num: -1

}

FunctionBasedComponent1.propTypes = {
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
      </div>
      
    </>
  )
}




export default App
