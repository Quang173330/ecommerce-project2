const express = require("express");
const router = express.Router();
const jwtAuthentication = require("../jwtAuthentication");

const orders = require("../controllers/orders.controller");

router.get("/getOrders/", jwtAuthentication, (req, res) => {
    orders.getOrders(req.userId).then(orders => res.json(orders));
});
router.get("/getAllOrders/",jwtAuthentication, (req,res) =>{
    orders.getAllOrders().then( orders => res.json(orders));
});
router.post("/update/",jwtAuthentication,(req,res)=>{
    const id= req.body.id;
    const state=req.body.state;
    orders.updateState(id,state).then(orders=> res.json(
        {
            status:true,
            local:"/my-account/orders"
        }
    ));
})
router.post("/deleteById/",(req,res)=>{
    const id=req.body.id;
    orders.deleteById(id).then(orders=> res.json({status:true}));
});
module.exports = router;