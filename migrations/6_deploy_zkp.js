const zkp = artifacts.require("zkp.sol");

module.exports = function (deployer) {
  deployer.deploy(zkp);

};
