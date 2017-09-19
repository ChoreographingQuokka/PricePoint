import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class FriendSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // getValidationState() {
  //   let splitByAts = this.state.value.split('@');
  //   let splitByDots = splitByAts.length > 1 ? splitByAts[1].split('.') : null;
  //   if (splitByDots && plitByAts.length === 2 && splitByAts[0].length > 0
  //       && splitByDots[0].length > 0 && splitByDots[1].length > 0 )
  //       return 'success';
  //   else return 'error';
  //  validationDate = {this.getValidationState()}
  //<HelpBlock>Must enter a valid email.</HelpBlock>
  // }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="findAFriend"
        >
          <ControlLabel>Find a Friend</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter email"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}

export default FriendSearch;
