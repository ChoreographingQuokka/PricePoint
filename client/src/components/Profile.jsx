import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-bootstrap';
import ProfileUser from './ProfileUser.jsx';
import ProfileInput from './ProfileInput.jsx';
import ProfileTable from './ProfileTable.jsx';
import FriendSearch from './FriendSearch.jsx';
import '../styles/main.scss';
import { connect } from 'react-redux';


const Profile = () => {
  var dummyData = [
    {name: 'tableOne', listItems: [{upc: '887276197470'}, {upc: '887276197470'}, {upc: '887276197470'}]},
    {name: 'tableTwo', listItems: [{upc: '887276197470'}, {upc: '887276197470'}, {upc: '887276197470'}]},
    {name: 'tableThree', listItems: [{upc: '887276197470'}, {upc: '887276197470'}, {upc: '887276197470'}]},
  ]
 
  return (
    <Grid>
      <ProfileUser></ProfileUser>
      <FriendSearch> </FriendSearch>
      <ProfileInput></ProfileInput>
      {dummyData.map( (list, i) => {
        return <ProfileTable key={i} name={list.name} items={list.listItems}></ProfileTable>
      })}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    'tables': state.tables,
  };
};

export default connect(mapStateToProps)(Profile);

