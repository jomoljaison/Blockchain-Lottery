const lottery = artifacts.require("lottery");
winner="";

module.exports = function (deployer) {
  deployer.deploy(lottery,winner);
};
