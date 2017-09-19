const db = require('../');

const Product = db.Model.extend({
  tableName: 'products',

  prices: function() {
    return this.hasMany('Price');
  },

  product_urls: function() {
    return this.hasMany('ProductUrl');
  },

  vendors: function() {
    return this.belongsToMany('Vendor')
      .through('ProductUrl');
  },

  categories: function() {
    return this.belongsToMany('Categories');
  },

  toJSON: function() {
    var product = this.serialize();
    var item = {
      name: product.name,
      description: product.description,
      imageURL: product.image_url,
      upc: product.upc,
    };

    if (product.product_urls) {
      item.vendors = {};

      for (let i = 0; i < product.product_urls.length; i++) {
        let product_url = product.product_urls[i];

        item.vendors[product_url.vendor.name] = {
          url: product_url.url,
          prices: [],
        };
      }
    }

    if (product.prices) {
      for (let i = 0; i < product.prices.length; i++) {
        let price = product.prices[i];

        item.vendors[price.vendor.name].prices.push({
          price: price.price,
          timestamp: price.created_at
        });
      }
    }

    return item;
  }
});

module.exports = db.model('Product', Product);
