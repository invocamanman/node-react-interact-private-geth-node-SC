exports.TODO_LIST_ADDRESS = '0xACD2F31C343adFC7f1Bd6e3c507325BD8f29ee3D'

exports.TODO_LIST_ABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "registroCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "Registros",
      "outputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "hash",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "hash",
          "type": "string"
        }
      ],
      "name": "RegistroCreated",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_hash",
          "type": "string"
        }
      ],
      "name": "createRegistro",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
