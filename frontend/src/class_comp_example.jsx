import React from "react"
class ClassBasedComponent extends React.Component{

  constructor(props) {
    super(props);
  }

    render() {
        return (
            <>
              <div>
              <h1>{this.props.title}</h1>
              <p>information...</p>
              <hr></hr>
              </div>
            </>
          )
    }
}
export default ClassBasedComponent