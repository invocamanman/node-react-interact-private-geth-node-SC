import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import{TODO_LIST_ABI, TODO_LIST_ADDRESS} from './config'
//var BigNumber = require('big-number');
import RegistreC from './Registre'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      accounts: [],
      registros: [],
      registreCount: 0,
      tasks: [],
      loading: true
       }
    this.newRegister= this.newRegister.bind(this)
    this.callAPI = this.callAPI.bind(this);
    this.ContractCount = this.ContractCount.bind(this);
  }
  async callAPI2() {

    let response = await fetch("http://localhost:9000/testAPI/accounts")
    let accounts = await response.json();
    this.setState({ accounts: accounts });
    console.log(this.state.accounts);
  }
  async callAPI() {
    let response = await fetch("http://localhost:9000/testAPI")
    let registros = await response.json();
    console.log("registros:",registros);
    this.setState({registros: []})
    registros.map((registro)=>{
      this.setState({
       registros: [...this.state.registros, registro["hash"]]
      })
    });
  }
  async ContractCount(){
    console.log("before call", this.state.registreCount)
    let response = await fetch("http://localhost:9000/testAPI/count")
    let count = await response.json();
    this.setState({ registreCount: count });
    console.log("after call",this.state.registreCount)
  }

  async newRegister(content){//hacer post!!
    let response = await fetch("http://localhost:9000/testAPI/newregister",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({hash: content})//, {a:1, b:2}... // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    });
    //let response2 = await response.json(); pendiente
    console.log("correcto^^")
    this.callAPI();
  }
  componentWillMount(){
    this.loadBlockchainData()
  }

  async loadBlockchainData(){
    //const web3= new Web3(Web3.givenProvider)//podria ser el de infura : "https://mainnet.infura.io/v3/7f5338a0ad3f4479927a4578bfaf0b35"
    //pero entonces no coge las accountsdel metamask

  //  if (window.ethereum) {
  //       window.ethereum.enable()
  //   }

    // const network = await web3.eth.net.getNetworkType()
    // const accounts = await web3.eth.getAccounts()
    // this.setState({account: accounts[0]})
    // const todoList= new web3.eth.Contract ( TODO_LIST_ABI,TODO_LIST_ADDRESS)
    // this.setState({todoList})
    // const taskCount  = await todoList.methods.taskCount().call()
    // console.log("taskCount", taskCount)
    // console.log("taskCount", taskCount.toNumber())
    // console.log("taskCount", taskCount.toString())
    // console.log("todoList task1", await todoList.methods.tasks(1).call())
    // this.setState( {taskCount: taskCount.toString()} ) // same than taskCount : taskCount

    // console.log("taskCount", taskCount)
    // console.log("account", accounts)
    // console.log("network",  network)
    // console.log("defalut account",  web3.eth.defaultAccount)
    // console.log("provider",  web3.eth.currentProvider)
    // console.log("provider",  web3.currentProvider)


/*    web3.eth.getBalance('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', (err, wei) => {
      let balance = web3.utils.fromWei(wei, 'ether')
      console.log("balancerandomaccount ", balance)
    })*/

    // this.setState({tasks: []});
    // for (var i = 1; i <= taskCount; i++) {
    //   const task = await todoList.methods.tasks(i).call()
    //   console.log("taskbucle", task)
    //   this.setState({
    //     tasks: [...this.state.tasks, task]
    //   })
    // }
   await this.callAPI() ;
   this.setState({loading: false})
 
  }


  
  showLoading(){
    return  <div id="loader" className="text-center">
    <p className="text-center">Loading...</p>
  </div>

  }

  loadRegistre(){
     
    return  <RegistreC registros={this.state.registros} newRegister= {this.newRegister}/>
  }

  render() {
    return (
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small><a className="nav-link" href="#"><span id="account"></span></a></small>
              </li>
            </ul>
          </nav>
          <div className="container-fluid">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex justify-content-center">
               
                {this.state.loading? this.showLoading() : this.loadRegistre()}
               
              </main>
            </div>
          </div> 
          <button type="button" onClick={this.ContractCount}>
            count
          </button>
          <button type="button" onClick={this.newRegister}>
            nuevoregistro
          </button>
        </div>
      );
  }
}

export default App;
