const fs = require('fs')
const express = require('express')
const axios = require('axios');
const app = express()
const port = 4242
const db = require("./database")
const knex = require('knex')({
    client: 'pg',
    connection: {
        host : 'localhost',
        user : 'postgres',
        password : 'password',
        database : 'searchGithub',
        charset: 'utf8'
    }
})

db(knex)


app.get('/users/:login',(req,res)=>{
    let {login}=req.params
    knex('user').select('id').where('login',login).then(data => {
        console.log(data)
        if(data.length == 0)
        {
            axios('https://api.github.com/users/'+login).then((user) => { 
                res.json(user.data)
                return knex('user').insert(user.data)
            })
        }
    })
    /*axios('https://api.github.com/users/'+login).then((user) => { 
        res.json(user.data)
    })*/
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
  })
  
/*
axios('https://api.github.com/users/Khazise').then((response) => {      
    fs.writeFileSync('user.json', JSON.stringify(response.data));   
    //console.log(response.data)              
}, (error) => {                                                 
    console.log("Error: ", error);                          
});

*/