const express = require('express');
const app = express();
const readMe = require('./readMeRepos/readMe');

const router = express.Router();

app.use(express.json());

router.get('/parcels', function(req, res, next) {
    readMe.get(function(data){
        if(data){
        res.status(200).json({
           "status": "200",
           "statusText": "OK",
           "message": "You requested to see the parcel delivery orders",
           "orders": data

        });
    }else{
        req.status(404).json({
           "status": "404",
           "statusText": "Not found",
           "message": "Request not found"
        });
    }
},
    function(err){
         next(err);
    
    });

});


//ROUTER.GETBYID
router.get('/parcels/:id', function(req, res, next){
    readMe.getById(req.params.id, function(data){
        if(data){
        res.status(200).json({
            "status": "200",
            "statusText": "OK",
            "message": "you requested to see the product with the id:" + req.params.id,
            "orderId": req.params.id,
            "orderRequested": data
        });
    }
        else{
        res.status(404).json({
             "status": "404",
             "statusText": "Not found",
             "message": "Request not found"
            });
        }
},
     function(err){
        next(err);
     });
});

//getUserId
router.get("/users/:userId", function(req, res, next){
    readMe.getUsersId(req.params.userId, function(data){
        if(data){
            res.status(200).json({
                "message": "you requested to see the orders of userId " + req.body.userId,
                "data": data.products
            })
        }else{
            res.status(404).json({
                "status": 404,
                "statusText": "Not found",
                "message": "user could not be found"
            })
        }
    },
    function(err){
        next(err);
    }
    )
});



//ROUTER.POST
router.post('/parcels', function(req, res, next){
    readMe.insert(req.body, function(data){
            if(data){
            res.status(201).json({
               "status": "201",
               "statusText": "OK",
               "message": "order was created",
               "createdOrder": data
            })
            } 
             else{
                res.status(404).json({
                    "status": "404",
                    "statusText": "An error occured",
                    "message": "order not created"
                });
        }
        },
    function(err){
        next(err);
    });
});


//ROUTER.PUT
router.put('/parcels/:id', function(req, res, next){
    readMe.getById(req.params.id, function(data){
        if(data){
            readMe.update(req.body, req.params.id, function(data){
               res.status(200).json({
                   "message": "you updated the order with the id " + req.params.id,
                   "updatedData": data
               });
            });
        }
        else{
            res.status(404).json({
                "message": "something went wrong",
                "error": {
                    "message": "something went wrong",
                    "code": "Error 404"
                }
            });
        }
    },
     function(err){
        next(err);
     }
    );
});
router.patch('/parcels/:id', function(req, res, next){
    readMe.getById(req.params.id, function(data){
        if(data){
            readMe.update(req.body, req.params.id, function(data){
               res.status(200).json({
                   "message": "you patched the order with the id " + req.params.id,
                   "patchedData": data
               });
            });
        }
        else{
            res.status(404).json({
                "message": "something went wrong",
                "error": {
                    "message": "something went wrong",
                    "code": "Error 404"
                }
            });
        }
    },
     function(err){
        next(err);
     }
    );
});
router.delete('/parcels/:id', function(req, res, next){
    readMe.getById(req.params.id, function(data){
        if (data) {
            readMe.delete(req.params.id, function(data){
                res.status(200).json({
                    "message": "you deleted the order with the id: " + req.params.id,
                    "deletedData": "order " + req.params.id + " was deleted"
                });
            })
        }else{
            res.status(404).json({
                "message": "Not found",
                "error":{
                    "code": "NOT_FOUND"
                }
            });
        }
    },
    function(err){
        next(err);
    }
    )
});

app.use("/api/", router);

var server = app.listen(3000, function() {
console.log("now listening to port 3000");
});