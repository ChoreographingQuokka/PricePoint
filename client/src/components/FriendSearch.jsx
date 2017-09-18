import React from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FriendSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    event.preventDefault();
    console.log(event);
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <form>
        <FormGroup controlId="findAFriend" >
          <ControlLabel>Find a friend</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter email"
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
    );
  }
}

export default FriendSearch;
