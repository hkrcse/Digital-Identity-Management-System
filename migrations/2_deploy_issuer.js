const issuer = artifacts.require("issuer.sol");

module.exports = function (deployer) {
  deployer.deploy(issuer);

};
