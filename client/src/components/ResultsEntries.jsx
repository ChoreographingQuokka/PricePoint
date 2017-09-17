import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'react-bootstrap';
import { Thumbnail, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/main.scss';
import Track from './Track.jsx';

const ResultsEntries = (props) => (
  <Row>
    {props.results.map((el) => {
      //reduce length to eliminate spill over
      var name = el.name;
      if (name.length > 84) {
        name = name.slice(0, 84) + '...';
      }
      //reduce length to eliminate spill over  
      var description = el.description;
      if (description.length > 390) {
        description = description.slice(0, 390) + '...';
      }
      
      var init = false;
      var lowestPriceURL, lowestPriceValue;
      //for each vendor a product has
      for (var vendor in el.vendors) {
        //go through all of their prices
        el.vendors[vendor].prices.forEach( (item) => {
          //set first price found as lowestprice 
          if (init === false) {
            lowestPriceURL = el.vendors[vendor].url;
            lowestPriceValue = el.vendors[vendor].prices[0].price;
            init = true;
            return;
          }
          //if a lower price is found than the current lowest
          if ( item.price < lowestPriceValue ) {
            //set that price to the lowest
            lowestPriceValue = item.price;
            //also update the lowest price url to this vendor
            lowestPriceURL = el.vendors[vendor].url;
          }
        });
      }

      return (
        <Col xs={12} md={6} lg={4}>
          <Thumbnail className="results-thumb" src={`${el.imageURL}`}>
            <Link to={`/product/${el.upc}`}>
              <h3>{name}</h3>
            </Link>
            <p>{description}</p>
            <p>
              <Track />&nbsp;
              <a target="_blank" href={lowestPriceURL}><Button bsStyle="default"> ${lowestPriceValue / 100}</Button>
              </a>
            </p>
          </Thumbnail>
        </Col>
      );
    })}
  </Row>
);

const mapStateToProps = (state) => {
  return {
    'results': state.results
  };
};

export const UnwrappedResultsEntries = ResultsEntries;
export default connect(mapStateToProps)(ResultsEntries);
