var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var config = require ('../resources/config');
var Tx = require('ethereumjs-tx')

const account = '0x453dae2286Fe4b569670a579BC38651eFBF42656'

const accounttest='0x53878D5E54C6A8d115853cBD663bEfD07b5b118D'

const url=  "http://10.96.100.10:8545" //"http://10.96.100.10:8545" "http://localhost:7545"

const addrestest = '0x1A90A2EF90D19f10d693A3BfAcEA929423Cf92D0' //contract, cmabiarla por la de config
//cmabiar url, i addres contract en el objeto de transaccion y en la interfaz del contrato, cambiar account por accountest, i private key

//const privateKey= '21b3998314573fb44735444b4ad8f98172dfe67bf5872511fc3e9dcbc740736b'

//21b3998314573fb44735444b4ad8f98172dfe67bf5872511fc3e9dcbc740736b    clave privada nodo con ethers
//address: 0x453dae2286Fe4b569670a579BC38651eFBF42656

//^2.1.0
//poner la version 1.3.7 de ethereumjs-tx i quitar el .Transaction del require
router.get('/accounts', function(req, res, next) {
    const web3= new Web3(url)
    web3.eth.getAccounts().then(console.log)
    web3.eth.getAccounts((err, accounts) =>{    
        console.log("accounts:" , accounts[0])
        res.send(accounts);
    })
});

function Registrospromise(value) {
    return new Promise((resolve,reject) => {
    const web3= new Web3(url)
    const Registre= new web3.eth.Contract ( config.TODO_LIST_ABI , config.TODO_LIST_ADDRESS)
    //const Registre= new web3.eth.C
    Registre.methods.Registros(value).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'},(error, Registro) =>{
            if (error)
                reject(error);
            else{
                resolve(Registro);
            }
            });
    });

  }

router.get('/', function(req, res, next) {
    const web3= new Web3(url)
    //const Registre= new web3.eth.Contract ( config.TODO_LIST_ABI,config.TODO_LIST_ADDRESS)
    const Registre= new web3.eth.Contract ( config.TODO_LIST_ABI , config.TODO_LIST_ADDRESS)

    let Registros =[];
    let promises = [];

    var promise = Registre.methods.registroCount().call({from: '0x453dae2286Fe4b569670a579BC38651eFBF42656'}, (error, Count) => {
        if (error)
            console.log(error);
        else{


            for (var i = 1; i <= Count; i++) {
                promises.push(Registrospromise(i));
            }
            Promise.all(promises).then((results) => {
                console.log("All done", results);
                res.send(results)
            })
            .catch((e) => {
                console.log(e)
            });
        }
    });

});


router.get('/count', function(req, res, next) {
    const web3= new Web3(url)
    //const Registre= new web3.eth.Contract ( config.TODO_LIST_ABI,config.TODO_LIST_ADDRESS)
    const Registre= new web3.eth.Contract ( config.TODO_LIST_ABI , config.TODO_LIST_ADDRESS)

    Registre.methods.registroCount().call({from: '0x453dae2286Fe4b569670a579BC38651eFBF42656'}, (error, result) => {
    if (error)
        console.log(error);
    else{
        console.log(result)
        res.send(result);
    }
       
    });
    
    
});

router.post('/newregister', function(req, res, next) {

    const privateKey = Buffer.from(
       '21b3998314573fb44735444b4ad8f98172dfe67bf5872511fc3e9dcbc740736b', 'hex') // real
    //   const privateKey = Buffer.from(
    //     'c5c70b480bcbecb6f43fba946fb7d989e280ca408ad3aa173c1512bcc2d08ebc', 'hex') // ganache
    
    console.log(req.body)
    const web3= new Web3(url)
    const Registre= new web3.eth.Contract ( config.TODO_LIST_ABI, config.TODO_LIST_ADDRESS)
    web3.eth.getTransactionCount(account, (err, txCount) => {

        if (err){
            res.send(err)
            console.log(err)
        }
        else{
            console.log("txCount", txCount)
            const txObject = {
            nonce:    web3.utils.toHex(txCount),//0=>txCount
            gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            to: config.TODO_LIST_ADDRESS , //addrestest  config.TODO_LIST_ADDRESS
            data: Registre.methods.createRegistro(req.body.hash).encodeABI(),
            chainId:  web3.utils.toHex(29754)
            }

            const tx = new Tx(txObject)
            tx.sign(privateKey)
            
            const serializedTx = tx.serialize()
            const raw = '0x' + serializedTx.toString('hex')
            web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            if (err)
            {
                console.log(err)
                res.send(err)
            }
            else{
                console.log(txHash)
                res.send(txHash)
            }
            // Use this txHash to find the contract on Etherscan!
            })
        }
      })
      
    
});
module.exports = router;