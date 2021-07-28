var express = require('express');
var router = express.Router();
const Article = require('../models/articles');
const Order = require('../models/orders');
const User = require('../models/users');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const emptyArticles = await Article.find({ stock: 0}).countDocuments()
  const admin = await User.findById('5c52e4efaa4beef85aad5e52')
  const unreadMessages = admin.messages.filter(item => item.read === false).length
  const unclosedTasks = admin.tasks.filter(item => item.dateCloture === null).length

  const unread = await User.aggregate([
    {"$unwind": "$messages"},
    {"$match": {"messages.read": false}},
    {
        "$group": {
            "_id": '$_id',
            "count": {"$sum": 1}
        }
    }
])
console.log(unread)
  res.render('index', { emptyArticles, unreadMessages, unclosedTasks });
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {
  var admin = await User.findById('5c52e4efaa4beef85aad5e52')
  res.render('tasks', { admin });
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {
  var admin = await User.findById('5c52e4efaa4beef85aad5e52')
  res.render('messages', { admin });
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {
  const users = await User.find({ status: "customer" })
  res.render('users', { users });
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {
  const articles = await Article.find()
  res.render('catalog', { articles });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {
  const orders = await Order.find()
  res.render('orders-list', { orders });
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {
  const order = await Order.findById(req.query.id).populate('articles').exec()
  res.render('order', { order });
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {

  const users = await User.find()

  const countMale = users.filter(item => item.gender === 'male').length
  const countFemale = users.filter(item => item.gender === 'female').length

  let unreadMessages = 0
  let readMessages = 0
  for(let i=0; i<users.length; i++) {
    const unreadMessage = users[i].messages.filter(item => item.read === false).length
    unreadMessages += unreadMessage
    const readMessage = users[i].messages.filter(item => item.read === true).length
    readMessages += readMessage
  }
  

  const paidAndShipted = await Order.find({ $and: [ { status_payment: "validated" }, { status_shipment: true } ] } ).countDocuments()
  const paidAndUnshipted = await Order.find({ $and: [ { status_payment: "validated" }, { status_shipment: false } ] } ).countDocuments()
 
  let turnoverByMonth = await Order.aggregate([
    { $match: { status_payment: "validated" } },
    { 
      $group: {
          "_id": { 
              "month": { $month: "$date_payment" },
              "year": { $year: "$date_payment" }
          },
          "turnover": { $sum: "$total" }  
      }
    },
    { $sort: { _id: 1 }}
  ])



let turnoverStringyfied = JSON.stringify(turnoverByMonth)

console.log(turnoverStringyfied)

  res.render('charts', { countMale, countFemale, unreadMessages, readMessages, paidAndShipted, paidAndUnshipted, turnoverStringyfied});
});



module.exports = router;
