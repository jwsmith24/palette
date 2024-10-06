import React from "react"
import {PropTypes} from 'prop-types'
class ClassBasedComponent extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
      // this.classButtonClicked = this.classButtonClicked.bind(this)
  }


  classButtonClicked() {
    this.setState({
      count: this.state.count + 1
    });
  }

    render() {
        return (
            <>
              <div>
              <h1>{this.props.title}</h1>
              <p>This is an example of a state change from a class based component.</p>
              <p>Count: {this.state.count}</p>
              <button onClick={() => this.classButtonClicked()}>Class Based State Counter</button>
              <hr></hr>
              </div>
            </>
          )
    }
}

ClassBasedComponent.defaultProps = {
  title: "Default",
};

ClassBasedComponent.PropTypes = {
  title: PropTypes.string,
};


export default ClassBasedComponent