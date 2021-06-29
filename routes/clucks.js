const express = require('express');
const knex = require('../db/queries');
const createdTimeToFormatted = require("../public/javascripts/time");


const router = express.Router();

function redirectToSignIn(req, res, next) {
  if (res.locals.username) {
    next();
  } else {
    res.render('sign_in');
  }
}

router.get('/', (req, res) => {
  knex.index().orderBy("created_at", "desc")
  .then(data => {
    let output = [];
    data.forEach((item)=>{
      if(item.created_at){
          item.created_at = createdTimeToFormatted.createdTimeToFormatted(item.created_at);
          output.push(item);
      }
  })
    res.render('index', { clucks: output });
  });
});

router.get('/new', redirectToSignIn, (req, res) => {
  res.render('new');
});

router.post('/', (req, res) => {
  req.body.username = req.cookies.username;
  console.log(req.body);
  knex.create(req.body).then(data => {
    res.redirect(`/clucks/${data[0].id}`);
  });
});

router.get('/:id', (req, res) => {
  knex.show(req.params.id).then(data => {
    res.render('show', { cluck: data });
  });
});

router.delete('/:id', (req, res) => {
  console.log('task id is:' + req.params.id);
  knex.delete(req.params.id).then(() => {
    res.redirect('/clucks');
  });
});

module.exports = router;
