var express = require('express');
var router = express.Router();
var Web3 = require("web3");
const web3 = new Web3('http://localhost:7545');


router.post('/',function(req,res,next){
    reqData = req.body;
    console.log("Data",reqData);

    _unid=req.body._unid;
    console.log("lottery id",_unid);
    
    user=req.body.user;
    console.log("address of user",user);
    
    pether=req.body.pether;
    console.log("lottery id",pether);


    MyContract.methods.Buy(_unid).send({from :user,gas:6000000,value:Web3.utils.toWei(pether,'ether')}).on('transactionHash',(hash) => {

        console.log("Lets go",hash);
        res.send("Congratulations");
    }).on('error',(error) => {
        console.log(error.message);
        res.send("your action is not valid")
    });



});
module.exports = router;