import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Table, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';

const ProductTable = (props) => {

  //locate product in results state
  var UPC = window.location.href.slice(30);
  var product;
  props.results.forEach ( (item) => {
    if ( item.upc === UPC ) {
      product = item;
    }
  });
   
  //build vendor list for headers
  var vendors = []; 
  //grab the most recent price for each vendor
  var prices = [];
  for (var vendor in product.vendors) {
    vendors.push(<th><a href='#'>{vendor}</a></th>);
    //grab current price (last item in array)
    prices.push(product.vendors[vendor].prices[product.vendors[vendor].prices.length - 1]);
  }

  var priceHeader = vendors.length > 1 ? <td>{"Today's Prices"}</td> : <td>{"Today's Price"}</td> ;

  //find today's lowest price
  var lowestPrice = 0;
  for (var i = 1; i < prices.length; i++) {
    if (prices[lowestPrice] > prices[i]) {
      lowestPrice = i;
    }
  }

  //build jsx elements
  for (var x = 0; x < prices.length; x++) {
    var temp = prices[x].price / 100;
    if (x === lowestPrice || prices.length === 1) {
      prices[x] = <td className="lower">{'$' + temp + ' '}<Glyphicon glyph="star" className="starGlyph"/></td>;
      continue;
    }
    prices[x] = <td className="higher">{'$' + temp}</td>;
  }

  return (
    <Row>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th></th>
            { vendors }
          </tr>
        </thead>
        <tbody>
          <tr>
            { priceHeader }
            { prices }
          </tr>
        </tbody>
      </Table>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    'results': state.results
  };
};

export default connect(mapStateToProps)(ProductTable);
