import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  Button, Glyphicon,
  Form, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';

const Login = () => (
  <Grid>
    <Header></Header>
    <Row>
      <Col sm={6} smOffset={3}>
        <h1>
          <span>
            <Glyphicon glyph="log-in" bsSize="small"></Glyphicon> Login
          </span>
        </h1>
        <Form action="/login" method="post">
          <FormGroup>
            <ControlLabel>
              Email
            </ControlLabel>
            <FormControl
              type="text"
              name="email"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Password
            </ControlLabel>
            <FormControl
              type="password"
              name="password"
            />
          </FormGroup>
          <Button type="submit" bsSize="large" bsStyle="warning">Login</Button>
        </Form>
        <hr />
        <div>
          Or login with any of the following services:
          <br/>
          <a style={{marginRight: 15}} href="/auth/facebook">
            <img src="/assets/fb-logo.png" />
          </a>
          <a style={{marginLeft: 15, marginRight: 15}} href="/auth/google">
            <img style={{width: 29}} src="/assets/google-logo.png" />
          </a>
          <a style={{marginLeft: 15}} href="/auth/twitter">
            <img style={{width: 48}} src="/assets/twitter-logo.png" />
          </a>
        </div>
        <hr />
        <p>Need to sign up for an account? <Link to="/signup">Signup</Link></p>
        <p><Link to="/">home</Link></p>
      </Col>
    </Row>
  </Grid>
);

export default Login;
