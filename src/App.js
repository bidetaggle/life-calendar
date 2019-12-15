import React, {Component} from 'react';
import './App.css';
import LifeCalendar from 'react-lifecalendar'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dob: '1978-01-01',
      parsedDob: '01/01/1978',
      lifeExpectancy: 80,
      ranges: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.dobSubmit = this.dobSubmit.bind(this);
  }
  handleChange(event) {
    if(event.target.getAttribute('type') === "date")
      this.setState({dob: event.target.value});
    else if(event.target.getAttribute('type') === "number")
      this.setState({lifeExpectancy: event.target.value});
  }
  dobSubmit(event) {
    event.preventDefault();

    function incd(date, days){
      let d = date;
      return new Date(d.setDate(d.getDate()+days))
    }

    let dob = new Date(this.state.dob);

    if(!!dob.valueOf()){
      let parsedDob = 1+dob.getMonth()+'/'+dob.getDate()+'/'+dob.getFullYear();

      this.setState({
        parsedDob: parsedDob,
        ranges: [
          {start: parsedDob, end: incd(dob, 2800), title: 'Childhood', color: 'papayawhip'},
          {start: incd(dob, 0), end: incd(dob, 1826), title: 'Elementary School', color: 'silver'},
          {start: incd(dob, 0), end: incd(dob, 1096), title: 'Junior School', color: 'aqua'},
          {start: incd(dob, 0), end: incd(dob, 1096), title: 'High School', color: 'brown'}
        ]
      });
    }
    else
      alert(this.state.dob + ' is not a valid date :(');
  }

  render(){
    const data = {
      dob: this.state.parsedDob,
      lifeExpectancy: this.state.lifeExpectancy,
      ranges: this.state.ranges,
      milestones: [
      ]
    };

    return (
      <div className="App">
        <form onSubmit={this.dobSubmit}>
          <label>
            What is your birth date?
            <input type="date" value={this.state.dob} onChange={this.handleChange} />
            <input type="number" value={this.state.lifeExpectancy} onChange={this.handleChange} />
          </label>
          <input type="submit"/>
        </form>
        <LifeCalendar width="500" height="1000" title="Life Calendar" data={data}/>
      </div>
    );
  }
}

export default App;
