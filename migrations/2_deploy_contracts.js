const Imicontract = artifacts.require("Imicontract");

module.exports = function(deployer) {
  deployer.deploy(Imicontract);
};
