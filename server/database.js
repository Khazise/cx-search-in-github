const fs = require('fs');
const Sequelize = require('sequelize');
module.exports = function(sequelize) {
    const data = fs.readFileSync('../cx-search-in-github/server/user.json');
    const user = JSON.parse(data);

    let check = new Object();
    let userTable = new Object()             
    let fieldsUser = Object.keys(user);
    fieldsUser.forEach(field => {
        if(field == 'id')
        { 
            try {
                userTable['id'] = {"type": Sequelize.INTEGER, "autoIncrement": false, "primaryKey": true, "allowNull" : false}
                check[field] = true
            } catch (error) {
                
            }  
        }
        if(check[field] == null || check[field] == false)
        {
            try {
                check[field] = true;
                userTable[field] = {"type": Sequelize.STRING(255) }
            } catch (error) {
                
            }
            
        }
    }) 
    
    const table = sequelize.define('user',userTable )
    sequelize.sync()
    return table
};

