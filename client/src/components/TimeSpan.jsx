import React from 'react';
import ReactDOM from 'react-dom';
import { DropdownButton, MenuItem } from 'react-bootstrap';



const TimeSpan = (props) => {
  return (
    <DropdownButton title='History' id='time-period'
      onSelect={props.changeRange}
    >
      <MenuItem eventKey='1'>1 Day</MenuItem>
      <MenuItem eventKey='2'>2 Days</MenuItem>
      <MenuItem eventKey='7'>1 Week</MenuItem>
      <MenuItem eventKey='30'>1 Month</MenuItem>
      <MenuItem eventKey='90'>3 Months</MenuItem>
      <MenuItem eventKey='183'>6 Months</MenuItem>
    </DropdownButton>
  );
};

export default TimeSpan;
