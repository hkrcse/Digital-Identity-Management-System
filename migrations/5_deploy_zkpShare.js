const zkpShare = artifacts.require("zkpShare.sol");

module.exports = function (deployer) {
  deployer.deploy(zkpShare);

};
