import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Create a new CSS file for styling

const OfferingPage = () => {
  const [thirdHourPsalm, setThirdHourPsalm] = useState("");
  const [sixthHourPsalm, setSixthHourPsalm] = useState("");
  const [psalmData, setPsalmData] = useState({ thirdHourPsalms: [], sixthHourPsalms: [] });

  useEffect(() => {
    // Fetch data from the API and update the state
    axios.get("http://192.81.219.24:8080/offering")
      .then((response) => {
        setPsalmData(response.data[1]);
        // Set the default values to the first items in the lists
        setThirdHourPsalm(response.data[1].thirdHourPsalms[0] || "");
        setSixthHourPsalm(response.data[1].sixthHourPsalms[0] || "");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleThirdHourPsalmChange = (e) => {
    setThirdHourPsalm(e.target.value);
  };

  const handleSixthHourPsalmChange = (e) => {
    setSixthHourPsalm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log("Form submitted!");
    console.log("Third Hour Psalm:", thirdHourPsalm);
    console.log("Sixth Hour Psalm:", sixthHourPsalm);
  };

  return (
    <div className="center">
      <form onSubmit={handleSubmit} className="offering-form">
        {/* Third Hour Psalm Dropdown */}
        <div className="form-group">
          <label htmlFor="thirdHourPsalm" className="titles">3rd Hour Psalm</label>
          <select
            id="thirdHourPsalm"
            name="thirdHourPsalm"
            value={thirdHourPsalm}
            onChange={handleThirdHourPsalmChange}
            className="form-control"
          >
            {psalmData.thirdHourPsalms.map((item, index) => (
              <option key={index} value={item}>
                {item.split("/").slice(-1)[0].split(".")[0]}
              </option>
            ))}
          </select>
        </div>
        {/* Sixth Hour Psalm Dropdown */}
        <div className="form-group">
          <label htmlFor="sixthHourPsalm" className="titles">6th Hour Psalm</label>
          <select
            id="sixthHourPsalm"
            name="sixthHourPsalm"
            value={sixthHourPsalm}
            onChange={handleSixthHourPsalmChange}
            className="form-control"
          >
            {psalmData.sixthHourPsalms.map((item, index) => (
              <option key={index} value={item}>
                {item.split("/").slice(-1)[0].split(".")[0]}
              </option>
            ))}
          </select>
        </div>
        {/* Submit Button */}
        <div className="buttonDiv">
          <button type="submit" className="btn btn-success">
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferingPage;
