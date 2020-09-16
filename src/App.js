import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const URL = "/scrape";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      place: "",
      receivedData: "",
    };
  }

  onUrlTextChangeHandler = (event) => {
    this.setState({ jobTitle: event.target.value.replace(" ", "+") });
  };
  onPositionTextChangeHandler = (event) => {
    this.setState({ place: event.target.value.replace(" ", "+") });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state;
    axios({
      url: URL,
      method: "POST",
      data: data,
    })
      .then((res) => {
        this.setState({ receivedData: res.data.jobList });
      })
      .catch((error) => console.error("Error occured!!!!"));
  };

  render() {
    const { title, company, jobLink, location } = this.state.receivedData;
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <h2>Aspire for any job within Australia</h2>
            <div class="row">
              <div class="col-lg">
                <input
                  type="text"
                  id="txtJobTitle"
                  onChange={this.onUrlTextChangeHandler}
                  placeholder="Job Title"
                />
              </div>
              <div class="col-lg">
                <input
                  type="text"
                  id="txtPlace"
                  onChange={this.onPositionTextChangeHandler}
                  placeholder="City"
                />
              </div>
              <div class="col-lg">
                <input class="btn" type="submit" id="btnSend" value="Search" />
              </div>
              <div class="col-lg">
                <input
                  class="btn"
                  type="button"
                  id="btnReset"
                  value="Reset"
                  onClick={() => {
                    window.location.reload();
                  }}
                />
              </div>
            </div>
          </form>
        </header>
        <section>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">
                  #
                </th>
                <th  scope="col">
                  Title
                </th>
                <th  scope="col">
                  Company
                </th>
                <th scope="col">
                  Location
                </th>
                <th  scope="col">
                  Link to Apply
                </th>
              </tr>
            </thead>
            <tbody>
            {title ? (
              title.map((title, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{title ? title : " "}</td>
                  <td>{company ? company[index] : " "}</td>
                  <td>{location ? location[index] : " "}</td>
                  <td>
                    <a href={jobLink ? jobLink[index] : "#"} target="blank">
                      {jobLink ? "Click here to Apply" : ""}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No data</td>
              </tr>
            )}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
