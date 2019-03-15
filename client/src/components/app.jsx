import React from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";

import OutlinedTextFields from "./input.jsx";
import SubmitButton from "./submitButton.jsx";
import AddNewWordButton from "./addNewWordButton.jsx";
import NewWord from "./inputNewWord.jsx";
import NewResponse from "./inputNewResponse.jsx";

let matchingWords = [];
let responses = [];
let newValue = [];
let display;

const overallStyles = {
  margin: "auto"
};

const divStyles = {
  display: "flex"
};

const textStyles = {
  fontFamily: "Roboto, Arial, sans-serif",
  textAlign: "center",
  paddingTop: "20px",
  paddingBottom: "10px"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      status: [""],
      userWord: "",
      userResponse: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddWord = this.handleAddWord.bind(this);
    this.handleNewWord = this.handleNewWord.bind(this);
    this.handleNewResponse = this.handleNewResponse.bind(this);
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

  handleNewWord(event) {
    console.log("new word", event.target.value);
    this.setState({
      userWord: event.target.value
    });
    console.log("new word state", this.state.userWord);
  }

  handleNewResponse(event) {
    console.log("new response", event.target.value);
    this.setState({
      userResponse: event.target.value
    });
    console.log("new response state", this.state.userResponse);
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
            if (i === matchingWords.length - 1) {
              displayArray.push(`and ${item}!!!`);
            } else {
              displayArray.push(`${item}, `);
            }
            return displayArray;
          });
          display.unshift("Stop using these words: ");
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

  handleAddWord(event) {
    event.preventDefault();
    console.log("We're in add word");
  }

  render() {
    return (
      <Grid item={true} xs={12} md={8} style={overallStyles}>
        <h1 style={textStyles}>Is your pitch worthy?</h1>
        <p style={textStyles}>
          This application will give you the perfect pitch in less time than a
          vesting period:
        </p>
        <OutlinedTextFields onChange={this.handleChange} />
        <SubmitButton onClick={this.handleSubmit} />
        <p style={textStyles}>{this.state.value}</p>
        <p style={textStyles}>
          {this.state.status.map((item, i) => (
            <b key={i}>{item}</b>
          ))}
        </p>
        <Grid item={true} xs={12} md={12} style={divStyles}>
          <Grid item={true} xs={12} md={6}>
            <NewWord onChange={this.handleNewWord} />
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <NewResponse onChange={this.handleNewResponse} />
          </Grid>
        </Grid>
        <AddNewWordButton onClick={this.handleAddWord} />
      </Grid>
    );
  }
}

export default App;
