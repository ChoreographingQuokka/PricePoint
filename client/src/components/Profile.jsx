import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-bootstrap';
import ProfileUser from './ProfileUser.jsx';
import ProfileInput from './ProfileInput.jsx';
import ProfileTable from './ProfileTable.jsx';
import FriendSearch from './FriendSearch.jsx';
import '../styles/main.scss';

const Profile = () => {
  return (
    <Grid>
      <ProfileUser></ProfileUser>
      <FriendSearch> </FriendSearch>
      <ProfileInput></ProfileInput>
      <ProfileTable></ProfileTable>
    </Grid>
  );
};

export default Profile;
