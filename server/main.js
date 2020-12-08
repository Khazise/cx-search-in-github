const fs = require('fs')
const express = require('express')
const axios = require('axios');
const app = express()
const port = 4242
const db = require("./database")
const Sequelize = require('sequelize');
const { exit } = require('process');

const sequelize = new Sequelize('searchGithub', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
  });

const table = db(sequelize)


app.get('/users',(req,res)=>{
    let {login}=req.query
    table.findOne({ where: {login: login} }).then(data => {
        console.log(data)
        if(data == null)
        {
            axios('https://api.github.com/users/'+login).then((user) => { 
                res.json(user.data)
                table.create(user.data)
            })
        }
        else
        {
            res.json(data)
        }
    })
})


app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
  })
