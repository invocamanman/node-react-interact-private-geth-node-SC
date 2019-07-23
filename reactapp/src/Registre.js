import React, { Component } from 'react';


class Registre extends Component {


 constructor(props) {
       super(props)
       this.state = {
        //tasks: [] onmount creo
         textboxvalue: ''
          }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({textboxvalue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newRegister(this.state.textboxvalue)
   
  }


  render() {
    return (
//task.content
         <div id="content">
                  <form onSubmit={this.handleSubmit}>
                    <input id="newTask"  type="text" className="form-control" 
                    value={this.state.textboxvalue} onChange={this.handleChange}/>
                    <input type="submit" hidden={true} />
                  </form>
                  <ul id="taskList" className="list-unstyled">
                    { this.props.registros.map((registro, key) => {
                      return(
                        <div className="taskTemplate"  key={key}>
                          <label>
                            <span className="content">{registro}</span>
                          </label>
                        </div>
                      )
                    })}
                  </ul>
                  <ul id="completedTaskList" className="list-unstyled">
                  </ul>
                </div>
    
      );
  }
}

export default Registre;
