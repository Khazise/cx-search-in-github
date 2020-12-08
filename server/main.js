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
/*
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
 exit(0)
 */
const table = db(sequelize)


app.get('/users/:login',(req,res)=>{
    let {login}=req.params
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