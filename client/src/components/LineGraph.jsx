import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import Header from './Header.jsx';
import { connect } from 'react-redux';
import {LineChart} from 'react-easy-chart';
import axios from 'axios';
import TimeSpan from './TimeSpan.jsx';

const normalizeData = (name, vendorObj) => {
  var obj = {};
  obj.name = name;
  obj.url = vendorObj.url;
  obj.data = [];
  obj.maxDomain = -Infinity;
  obj.minDomain = Infinity;
  for (var i = 0; i < vendorObj.prices.length; i++) {
    let dataPoint = {};
    let price = vendorObj.prices[i].price / 100;
    obj.maxDomain = obj.maxDomain < price ? price : obj.maxDomain;
    obj.minDomain = obj.minDomain > price ? price : obj.minDomain;
    dataPoint.x = vendorObj.prices[i].timestamp.slice(0, 19);
    dataPoint.y = price;
    obj.data.push(dataPoint);
  }
  obj.maxDomain *= 1.2;
  obj.minDomain /= 1.2;
  return obj;
};

const todayIs = () => {
  var today = new Date;
  today = new Date(today);
  return today.toISOString().slice(0, 19);
};

const setDateRange = (range) => {
  var modifiedDate = new Date;
  modifiedDate -= (range * 86400000);
  var formatedDate = new Date(modifiedDate).toISOString().slice(0, 19);
  return formatedDate;
};

const grabPrices = (upc) => {
  return axios.get('/query/itemPrices', {
    params: {
      upc: upc
    }
  })
    .then(results => {
      var vendors = [];
      var colors = ['blue', 'red', 'yellow', 'purple'];
      for (let vendor in results.data.vendors) {
        var obj = normalizeData(vendor, results.data.vendors[vendor]);
        obj.color = colors.pop();
        vendors.push(obj);
      }
      return vendors;
    })
    .catch(error => {
      console.log('the error is located in the axios request in LineGraph.jsx', error);
    });
};

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: setDateRange('7'),
      today: todayIs(),
      vendors: [],
      maxDomain: 0,
      minDomain: 100,

    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    grabPrices(this.props.upc)
      .then(vendors => {
        this.setState({...this.state, vendors: vendors,
          maxDomain: vendors[0].maxDomain, minDomain: vendors[0].minDomain});
        return vendors;
      })
      .catch(err => {
        console.log('The Error in the is', err );
      });
  }
  onDateChange(event) {
    this.setState({
      ...this.state,
      dateRange: setDateRange(event)
    });
  }

  render() {
    return (
      <div>
        <div>
          <ButtonGroup >
            {this.state.vendors.map(vendor => {
              return <Button
                style={{backgroundSize: '100%', width: 72,
                  backgroundColor: vendor.color, color: 'white'}}
                href={vendor.url}>
                {vendor.name}</Button>;
            })}
            <TimeSpan changeRange={this.onDateChange}/>
          </ButtonGroup>
        </div>
        <LineChart
          xType={'time'}
          axes
          yAxisOrientRight
          yDomainRange={[this.state.minDomain, this.state.maxDomain]}
          xDomainRange={[this.state.dateRange, this.state.today]}
          axisLabels={{x: 'Date', y: 'Price' }}
          grid
          datePattern={'%Y-%m-%dT%H:%M:%S'}
          vertical
          interpolate={'cardinal'}
          lineColors={this.state.vendors.map(vendor => {
            return vendor.color;
          })}
          width={750}
          height={250}
          data={this.state.vendors.map(vendor => {
            return vendor.data;
          })}
        />
      </div>
    );
  }
}
export default LineGraph;
