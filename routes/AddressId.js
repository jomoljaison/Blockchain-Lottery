var express = require('express');
var router = express.Router();

// Router to generate propertyId

router.post('/', async function (req, res, next) {
    data = req.body;
    console.log(data);
    let result = MyContract.methods.AddressId(data.user).call({ from: accountAddress,gas :3000000  })
    .then((txn) => {
           
            console.log(txn);
            console.log("correct1");
            res.json({  txn : txn  });
            console.log("correct2");

        }).catch(err=>{
            res.json({ error : err });
            console.log("error");
        })
});
module.exports = router;

