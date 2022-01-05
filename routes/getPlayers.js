var express = require('express');
var router = express.Router();
// getting data from blockchain
// and rendering it to the auction view
router.get('/', function (req, res, next) {
  //For getting accounts from local geth private chain

    //call getAuctionDetails from deployed contract for getting auction details
    MyContract.methods.getPlayers().call({ from: accountAddress }).then(function (data) {
 
      HighestBid = web3.utils.fromWei(web3.utils.toBN(data[1]), 'ether')
          res.render("index", { data: tickets});

        })
      })

module.exports = router;