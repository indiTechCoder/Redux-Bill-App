var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var expressJwt = require('express-jwt');

var billSchema = mongoose.Schema({
  name: String,
  item: String,
  content: String,
  description: String,
  cost: String,
  vendor: String
});

billSchema.plugin(timestamps);

var Bill = mongoose.model('Bill', billSchema);



router.get('/bills', function(req, res, next) {
  Bill
    .find({})
    .select({
      content: 0,
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    })
    .limit(100)
    .sort({
      createdAt: -1
    })
    .exec(function(err, bills) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Could not retrieve bills'
        });
      }
      res.json(bills);
    });

});

router.post('/bills', expressJwt({secret: process.env.JWT_SECRET}), function(req, res, next) {
  var body = req.body;
  var name = body.name;
  var cost = body.cost;
  var item = body.item;

  //simulate error if title, categories and content are all "test"
  //This is demo field-validation error upon submission. 
  // for testing only
  if (name === 'test' && item === 'test') {
    return res.status(403).json({
      name: 'name Error',
      item: 'item Error',
      content: 'cost Error',
      submitmessage: 'description Error!'
    });
  }

  if (!name || !cost || !item) {
    return res.status(400).json({
      message: 'Error title, categories and content are all required!'
    });
  }

  var bill = new Bill({
    name: name,
    cost: cost,
    item: item,
  });


  bill.save(function(err, bill) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not save bill'
      });
    }
    res.json(bill);
  });
});

router.get('/bills/:id', function(req, res, next) {
  Bill.findById({
    '_id': req.params.id
  }, function(err, bill) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not retrieve bill w/ that id'
      });
    }
    if(!bill) {
    	return res.status(404).json({message: 'Bill not found'})
    }
    res.json(bill);
  });
});

router.delete('/bills/:id', expressJwt({secret: process.env.JWT_SECRET}), function(req, res, next) {
  var id = req.params.id;
  if (id.length != 24) {
    return res.json({
      message: 'id must be a valid 24 char hex string'
    });
  }
  var id = mongoose.Types.ObjectId(req.params.id); //convert to objectid
  Bill.findByIdAndRemove(id, function(err, bill) {
    if (err) throw err;

    if(!bill) {
    	return res.status(404).json({message: 'Could not delete bill'});
    }

    res.json({
      result: 'Bill was deleted'
    });

  });
});

router.post('/bills/validate/fields', function(req, res, next) {
  var body = req.body;
  var name = body.name ? body.name.trim() : '';

  Bill.findOne({
    'name': new RegExp(name, "i")
  }, function(err, bill) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not find bill for title uniqueness'
      });
    }
    if (bill) {
      res.json({
        name: 'name is not unique!'
      });
    } else {
      return res.json({});
    }

  });
});


module.exports = router;