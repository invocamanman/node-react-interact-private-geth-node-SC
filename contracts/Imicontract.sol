pragma solidity ^0.5.0;

contract Imicontract {
  uint public registroCount = 0;

 constructor() public {
  }

  struct Registro {
    uint id;
    string hash;
  }

  mapping(uint => Registro) public Registros;

  event RegistroCreated(
  	uint id,
  	string hash
  );


  function createRegistro(string memory _hash) public {
      registroCount ++;
      Registros[registroCount] = Registro(registroCount, _hash);
      emit RegistroCreated(registroCount, _hash);

    }

}

//10.96.100.10
// bool exists = elements[key] != address(0)
//       if (!exists) {
//          keys.push(key);
//       }
//       elements[key] = addr;


//address 0xACD2F31C343adFC7f1Bd6e3c507325BD8f29ee3D