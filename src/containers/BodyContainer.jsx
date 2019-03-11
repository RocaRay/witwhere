import React, { Component } from 'react';
import { connect } from 'react-redux';
// import actions from action creators file
import * as actions from '../actions/actions';
// import from child components when the time comes...

const mapStateToProps = store => ({
  playerName: store.main.playerName,
  playerPass: store.main.playerPass,
});

const mapDispatchToProps = dispatch => ({
  testButton: () => {
    dispatch(actions.testButton())
  },
});

class BodyContainer extends Component {
  constructor(props) {
    super(props);
  }
  

  
  render(props) {
    var socket = io.connect('http://localhost:3000');
    return(
      <div className="body-container">
        <input value={'username'} /><input value={'password'} />
        <button onClick={this.props.testButton}>Submit</button>
        <form >
          <input type="text"></input>
          <input type="submit"></input>
        </form>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(BodyContainer);