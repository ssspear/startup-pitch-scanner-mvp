import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      status: "Let's see what's up"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const pitch = this.state.value.toLowerCase();

    axios
      .get("/words")
      .then(response => {
        response.data.forEach(item => {
          if (pitch.includes(item.word)) {
            this.setState({
              status: item.replace
            });
          }
          // if (!pitch.includes(item.word)) {
          //   this.setState({
          //     status: "You are GOOD!"
          //   });
          // }
        });
      })
      .catch(error => {
        console.log("error in axios get", error);
      });
  }

  render() {
    return (
      <div>
        <h1>Now we're talkin'</h1>
        <p>Pitches get stitches:</p>
        <input type="text" onChange={this.handleChange} />
        <button type="submit" onClick={this.handleSubmit}>
          submit this ish
        </button>
        <h1>{this.state.status}</h1>
      </div>
    );
  }
}

export default App;
