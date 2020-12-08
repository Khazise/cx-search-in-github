const fs = require('fs');

module.exports = function(knex) {
    const data = fs.readFileSync('../cx-search-in-github/user.json');
    const user = JSON.parse(data);

    knex.schema.hasTable('user').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('user',function(t,insertData){
                let check = new Object();
                
                let fieldsUser = Object.keys(user);
                fieldsUser.forEach(field => {
                    if(field == 'id')
                    { 
                        t.bigInteger('id').primary()
                        check[field] = true
                    }
                    if(check[field] == null || check[field] == false)
                    {
                        check[field] = true;
                        t.string(field, 500)
                    }
                })        
            });
        }
    });
};

