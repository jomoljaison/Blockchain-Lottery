var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {

  

    MyContract.methods.pickWinner().send({ from: accountAddress, gas: 1500000,to:winner})
        .on('receipt', function (receipt) {
            console.log(receipt)
           
            //res.send("<---------------AMOUNT credited--------------------->")
        })
        .on('error', (error) => {
            console.log(error.message);
            res.send("<---------------ACTION failed!!!!!");
        })
});

module.exports = router;