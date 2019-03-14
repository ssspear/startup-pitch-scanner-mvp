import React from "react";
import axios from "axios";

let matchingWords = [];
let responses = [];
let display;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      status: ["Let's see what's up"]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      status: ["Let's see what's up"]
    });
    matchingWords = [];
    responses = [];
  }

  handleSubmit(event) {
    event.preventDefault();
    const pitch = this.state.value.toLowerCase();

    axios
      .get("/words")
      .then(response => {
        response.data.forEach(item => {
          if (pitch.includes(item.word)) {
            matchingWords.push(item.word);
            responses.push(item.replace);
          }
        });
        display = matchingWords.map((item, i) => {
          let displayArray = [];
          displayArray.push(item + "?! I mean " + responses[i]);
          return displayArray;
        });
        this.setState({
          status: display
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
        <textarea type="text" onChange={this.handleChange} />
        <button type="submit" onClick={this.handleSubmit}>
          submit this ish
        </button>
        {this.state.status.map((item, i) => (
          <h1 key={i}>{item}</h1>
        ))}
      </div>
    );
  }
}

export default App;
