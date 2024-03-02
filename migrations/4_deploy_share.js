const share = artifacts.require("share.sol");

module.exports = function (deployer) {
  deployer.deploy(share);

};
