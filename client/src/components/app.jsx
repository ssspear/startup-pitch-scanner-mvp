import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log("what I am typing", event.target.value);
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit() {}

  render() {
    return (
      <div>
        <h1>Now we're talkin'</h1>
        <p>Pitches get stitches:</p>
        <input type="text" onChange={this.handleChange} />
        <input type="submit" value="submit this ish" />
      </div>
    );
  }
}

export default App;
