import React from 'react';

import Titles from "./components/Titles"
import Form from "./components/Form"
import Numspy from "./components/Numspy"
//import Footer from "./components/Footer"
class App extends React.Component {
  state = {
    name: undefined,
    number: undefined,
    state: undefined,
    provider: undefined,
    error: undefined
  }

  getDetails = async (e) => {
    e.preventDefault();
    const number = e.target.elements.number.value;
    if (number && number.length === 10 ){
      const api_call = await fetch(`http://numspy.pythonanywhere.com/LocateMobile/${number}`);
      const data = await api_call.json();
      console.log(data);
      this.setState({
        name: data.data.Name,
        number: data.data.Mobile,
        state: data.data.State,
        provider: data.data.Provider,
        error: ""
      });
    }
    else 
    {
      this.setState({
        name: undefined,
        number: undefined,
        state: undefined,
        provider: undefined,
        error: "Please Enter Valid 10 Digit Mobile Number."
      });
    } 
  }
  render(){
    return(
      <div>
        <div className = "wrapper">
          <div className = "main">
            <div className = "container">
              <div className = "row">
                <div className = "col-xs-5 title-container">
                  <Titles />                
                </div>  
                <div className= "col-xs-7 form-container">
                  <Form getDetails={this.getDetails}/>
                  <Numspy 
                    name={this.state.name}
                    number={this.state.number}
                    state={this.state.state}
                    provider={this.state.provider}
                    error={this.state.error}
                    />
                  </div>
                </div>  
            </div>  
          </div>
        </div>
      </div>
    );
  }
};

export default App;