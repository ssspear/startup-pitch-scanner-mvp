import React from "react";
import axios from "axios";

let matchingWords = [];
let responses = [];
let newValue = [];
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
    newValue = [];
  }

  handleSubmit(event) {
    event.preventDefault();
    let originalPitch = this.state.value;
    const pitch = this.state.value.toLowerCase();

    axios
      .get("/words")
      .then(response => {
        response.data.forEach(item => {
          if (pitch.includes(item.word)) {
            matchingWords.push(item.word);
            responses.push(item.replace);
            let regex = new RegExp(item.word, "gi");
            originalPitch = originalPitch.replace(regex, item.replace);
          }
        });
        newValue.push(originalPitch);
        newValue = newValue[0];
        if (matchingWords.length) {
          display = matchingWords.map((item, i) => {
            let displayArray = [];
            displayArray.push(item + "?! I mean " + responses[i]);
            return displayArray;
          });
          this.setState({
            status: display,
            value: newValue
          });
        } else {
          this.setState({
            status: ["WOW! Great job!"]
          });
        }
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
          Let's get rich
        </button>
        {this.state.status.map((item, i) => (
          <h3 key={i}>{item}</h3>
        ))}
        <p>{this.state.value}</p>
      </div>
    );
  }
}

export default App;
