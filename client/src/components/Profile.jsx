import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-bootstrap';
import ProfileUser from './ProfileUser.jsx';
import ProfileInput from './ProfileInput.jsx';
import ProfileTable from './ProfileTable.jsx';
import '../styles/main.scss';
import { connect } from 'react-redux';


const Profile = (props) => {
  console.log('PROFILE RENDER');

  return (
    <Grid>
      <ProfileUser></ProfileUser>
      <ProfileInput></ProfileInput>
      {props.tables.map( (item, i) => {
        return <ProfileTable key={i} listId={i} listName={item.name} list={item.list}></ProfileTable>;
      })}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    'tables': state.tables
  };
};

export default connect(mapStateToProps)(Profile);
