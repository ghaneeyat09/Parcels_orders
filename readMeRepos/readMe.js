let fs = require('fs');
let dataFile = './ordersRepos/orders.json';


//THE README OBJ
let readMe = {
    //GET
    get: function(resolve, reject){
        fs.readFile(dataFile, function(err, data){
            if(err){
                reject(err);
            }else{
                resolve(JSON.parse(data));
            }
        });
    },
    
    
    //getusersId
      getUsersId : function(userId, resolve, reject){
        fs.readFile(dataFile, function(err, data){
            if(err){
                reject(err);
            }else{
                let user = JSON.parse(data).find(u => u.userId == userId);
                resolve(user);
            }
        });
    },


    //GETBYID
    getById: function(id, resolve, reject){
        fs.readFile(dataFile, function(err, data){
            if(err){
                reject(err);
            }else{
                let order = JSON.parse(data).find(o => o.id == id);
                resolve(order);

            }
        });
    },




    //INSERT
    insert : function(newData, resolve, reject){
        fs.readFile(dataFile, function(err, data){
            if(err){
                reject(err);
            }else{
                let orders = JSON.parse(data);
                orders.push(newData);
                fs.writeFile(dataFile, JSON.stringify(orders), function(err){
                   if(err){
                       reject(err);
                   }
                   else{
                       resolve(newData);
                   }
                });
            }
        });
    },


    //UPDATE
    update: function(newData, id, resolve, reject){
           fs.readFile(dataFile, function(err, data){
               if(err){
                   reject(err);
               }else{
                   let orders = JSON.parse(data);
                   let order = orders.find(o => o.id == id);
                   if(order){
                   Object.assign(order, newData);
                   fs.writeFile(dataFile, JSON.stringify(orders), function(err){
                       if(err){
                           reject(err);
                       }
                       else{
                           resolve(newData);
                       }
                   });
                }
             }
         });
    },


    //THE DELETE OBJ
    delete: function(id, resolve , reject){
        fs.readFile(dataFile, function(err, data){
            if(err){
                reject(err)
            }
            else{
                let orders = JSON.parse(data);
                let index = orders.findIndex(i => i.id == id);
                if (index != -1) {
                    orders.splice(index, 1);
                    fs.writeFile(dataFile, JSON.stringify(orders), function(err){
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(index);
                        }
                    });
                }
            }
        });
    }


}

module.exports = readMe;