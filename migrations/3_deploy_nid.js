const nid = artifacts.require("nid.sol");

module.exports = function (deployer) {
  deployer.deploy(nid);

};
