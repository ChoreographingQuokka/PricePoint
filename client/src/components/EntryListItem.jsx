import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Table, Button, Glyphicon} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteItem } from '../store/actions/tables';
import { bindActionCreators } from 'redux';
import '../styles/main.scss';
import axios from 'axios';



const EntryListItem = (props) => {
  var onEntryListClick = () => {
    axios.post('./api/removeItem', {
      id: props.user,
      table: props.tableName,
      upc: props.listItem.upc})
      .then( (res) => {
        props.deleteItem(props.listId, props.controlId);
      })
      .catch( (err) => {
        console.log(err);
      });
  };

  return (
    <td>
      <Link to={`/product/${props.listItem.upc}`}>{props.listItem.name}</Link> &nbsp;
      <Button bsStyle="danger" className="btn-round btn-xs" onClick={onEntryListClick}><span className="glyphicon glyphicon-remove"></span></Button>
    </td>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteItem: deleteItem,
}, dispatch);

const mapStateToProps = state => {
  return {
    'user': state.user.id,
    'tables': state.tables
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryListItem);
