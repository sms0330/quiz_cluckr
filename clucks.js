const express = require("express");
const knex = require('../db/queries');

const router = express.Router();

router.get("/", (req,res) => {

    knex 
        .index() 
        .then(data => {
            res.render("index", {clucks: data});
        })
})

router.get("/new", (req,res) => {
    res.render("new");
})

router.post("/", (req, res) => {
    req.body.username = req.cookies.username;
    console.log(req.body);
    knex 
      .create(req.body) 
      .then(data => { 
        
        res.redirect(`/clucks/${data[0].id}`)
      
      })
  })

router.get("/:id", (req,res) => {
    knex
        .show(req.params.id)
        .then(data => {
            res.render("show", {todo: data})
        })
})

router.delete("/:id", (req, res) => {
    console.log("task id is:" + req.params.id);
    knex
    .delete(req.params.id)
    .then(() => {
      res.redirect("/clucks")
    })
})


module.exports = router;


