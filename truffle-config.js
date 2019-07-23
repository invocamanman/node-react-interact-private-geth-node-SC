var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "income hard limb wealth tongue fortune february circle emotion broken screen recall";


module.exports = {
  networks: {
    development: {
      host: "10.96.100.10",
      port: 8545, //
      network_id: "*", // Match any network id
      provider: () =>
        new HDWalletProvider(mnemonic, "http://10.96.100.10:8545"),
    },
    test: {
      host: "127.0.0.1",
      port: 7545, //
      network_id: "*"// Match any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}


//5BAB19CF28ECED416DD82A5C5F57CC709D824D5C888E2AC395B19DC37188E454    clave privada ropsten

//21b3998314573fb44735444b4ad8f98172dfe67bf5872511fc3e9dcbc740736b    clave privada nodo con ethers
//address: 0x453dae2286Fe4b569670a579BC38651eFBF42656