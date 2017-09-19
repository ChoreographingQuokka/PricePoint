import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createTable } from '../store/actions/tables';
import { bindActionCreators } from 'redux';
import '../styles/main.scss';
import axios from 'axios';


const ProfileInput = (props) => {
  let input;
  return (
    <Row>
      <Form
        onSubmit={ e => {
          e.preventDefault();
          //createTable(input.value);

          //send request to db to update user's table list
          axios.post('api/categories', {id: props.id, table: input.value})
            .then( response => {
              console.log('successful: post request');
              //after we know the info made its way to the db
              //lets update the state here...
              //ask the db for the users tables

            })
            .catch( error => {
              console.log('failed: post request', err);
            });

          //reset input feild
          input.value = '';
        }}
      >
        <FormGroup
          controlId="formBasicText"
        >
          <FormControl
            type="text"
            placeholder="Create a New Category"
            inputRef={ ref => {
              input = ref;
            }}
          />
          <FormControl.Feedback />
        </FormGroup>
      </Form>
    </Row>
  );
};

const mapStateToProps = state => ({
  id: state.user.id
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createTable: createTable,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInput);
