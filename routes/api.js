let express = require('express');
const Validator = require("fastest-validator");
// loading the middleware //
var db = require("../config/db");
const util = require('util');

//creating a router object 
let router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        message: 'api works',
    });
})

router.get('/allinfo', (req, res) => {

    db.query('SELECT * FROM states', function (error, results, fields) {
        if (error) throw error;
        if (results.length) {

            db.query("select * from administrations", function (error33, results33, fields33) {
                if (error33) throw error33;
                //console.log(results33);
                res.status(200).json({
                    states: results,
                    at_type: results33,
                    message: 'good',
                });

            });

        } else {
            res.status(400).json({
                message: 'smoething wrong'
            });
        }

    });

});


//user tax insert //
router.post('/usertax', (req, res) => {

    var name = req.body.name;
    var st_id = req.body.st_id;
    var at_id = req.body.at_id;
    var property = req.body.property;
    var land = req.body.land;
    var location = req.body.location;
    var taxes = req.body.taxes;
        let data1 = {
            name: name,
            st_id: st_id,
            at_id: at_id,
        };
        let sql1 = "INSERT INTO users SET ?";
        db.query(sql1, data1, (err1, result1) => {
            if (err1) {
                return res.status(400).json({
                    err: err1,
                    message: "Something went wrong",
                });
            }
            if (result1) {

                //insert part 2//
                let data2 = {
                    u_id: result1.insertId,
                    property: property,
                    land: land,
                    location: location,
                    taxes: taxes
                };

                let sql2 = "INSERT INTO taxes SET ?";
                db.query(sql2, data2, (err2, result2) => {
                    if (err2) {
                        return res.status(400).json({
                            err: err2,
                            message: "Something went wrong",
                        });
                    }
                    if (result2) {

                        return res.status(201).json({
                            message: "User Tax inserted sucessfully",
                        });
                    }
                });
                //

            }
        });
  


});

router.get('/allusers', (req, res) => {

    db.query('SELECT users.id,users.name, administrations.at_name, states.state_name, taxes.property, taxes.land,taxes.location,taxes.taxes FROM users JOIN taxes ON users.id = taxes.u_id JOIN administrations ON administrations.id = users.at_id JOIN states ON states.id = users.st_id', function (error, results, fields) {
        if (error) throw error;
        if (results.length) {

            return res.status(200).json({
                data: results,
                message: 'good',
            });

        }
    });


});


//to make this router object available to express globaly
module.exports = router;