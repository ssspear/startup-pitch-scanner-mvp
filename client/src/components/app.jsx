import React from "react";
import axios from "axios";
import OutlinedTextFields from "./input.jsx";
import SubmitButton from "./submitButton.jsx";

let matchingWords = [];
let responses = [];
let newValue = [];
let display;

const overallStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80%"
};

const textStyles = {
  fontFamily: "Roboto, Arial, sans-serif",
  textAlign: "center",
  paddingTop: "20px"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      status: [""]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      status: [""]
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
        <h1 style={textStyles}>Is your pitch worthy?</h1>
        <p style={textStyles}>
          This application will give you the perfect pitch in less time than a
          vesting period:
        </p>
        <OutlinedTextFields
          onChange={this.handleChange}
          style={overallStyles}
        />
        <SubmitButton onClick={this.handleSubmit} />
        <div style={textStyles}>
          {this.state.status.map((item, i) => (
            <h3 key={i}>{item}</h3>
          ))}
        </div>
        <p style={textStyles}>{this.state.value}</p>
      </div>
    );
  }
}

export default App;
