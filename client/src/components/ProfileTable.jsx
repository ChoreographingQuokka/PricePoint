import React from 'react';
import ReactDOM from 'react-dom';
import { Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/main.scss';

const ProfileTable = (props) => {
  return (
    <Row>
      <Table>
        <th>
          {props.name}
        </th>
        <tbody>
          {props.items.map( (listItem, i) => {
            return ( 
              <tr key={i}>
                <td>
                 <Link to={`/product/${listItem.upc}`}>{listItem.upc}</Link>
                </td>
              </tr>)
          })}
        </tbody>
      </Table>
    </Row>
  );

  // return (
  //   //old
  //   <Row>
  //     {Object.keys(props.tables).map((el, i) => (
  //       <Table>
  //         <thead>
  //           <tr>
  //             <th key={i}>
  //               {el}
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {props.tables[el].map((item, x) => (
  //             <tr key={x}>
  //               <td>
  //                 <Link to={`/product/${item.upc}`}>{item.item}</Link>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </Table>
  //     ))}
  //   </Row>
  // );
};

const mapStateToProps = state => {
  return {
    'tables': state.tables,
  };
};

export const UnwrappedProfile = ProfileTable;
export default connect(mapStateToProps)(ProfileTable);
