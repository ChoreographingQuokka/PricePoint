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
  
  //get lowest price url
  var lowestPriceURL, lowestPriceValue;
  var seen = false;
  var obj = productItem[0].vendors;
  for (var vendor in obj) {
    //initialize variables with first url/price found
    if ( lowestPriceURL === undefined ) {
      lowestPriceURL = obj[vendor].url;
      lowestPriceValue = obj[vendor].prices[0].price;
      continue;
    }
    //check if the most recent price (first in array)
    //is less than the current lowestPriceValue
    if( lowestPriceValue < obj[vendor].prices[0].price ) {
      lowestPriceURL = obj[vendor].url;
      lowestPriceValue = obj[vendor].prices[0].price;
    }
  }

  let sendToProductPage = () => {
    window.open(lowestPriceURL);
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
      <LineGraph upc={productItem[0].upc}/>
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
