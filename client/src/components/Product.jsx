import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Thumbnail, Button } from 'react-bootstrap';
import ProductTable from './ProductTable.jsx';
import { connect } from 'react-redux';
import LineGraph from './LineGraph.jsx';

const Product = (props) => {
  var productItem = [];
  var getProductDataFromState = () => {
    var UPC = window.location.href.slice(30);
    props.results.forEach ( (item) => {
      if ( item.upc === UPC ) {
        productItem.push(item);
      }
    });
  };

  getProductDataFromState();
  let sendToProductPage = () => {
    window.open(productItem[0].itemURL);
  };

  return (
    <div className="productContainer">
      <Row>
        <Col xs={6} md={3}>
          <Thumbnail className="productImage" href="#" src={productItem[0].imageURL} />
        </Col>
        <Col xs={6} md={9}>
          <h2 className="title">{productItem[0].name}</h2>
          <b className="descriptionTitle">DESCRIPTION: </b>
          <b className="description">{productItem[0].description}</b>
        </Col>
        <Button onClick={sendToProductPage}>BUY NOW</Button>
      </Row>
      <LineGraph />
      <ProductTable></ProductTable>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    'results': state.results
  };
};

export default connect(mapStateToProps)(Product);
