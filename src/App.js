import React, { useState, useEffect } from "react";
import axios from "axios";

const OfferingPage = () => {
  const [thirdHourPsalm, setThirdHourPsalm] = useState("");
  const [sixthHourPsalm, setSixthHourPsalm] = useState("");
  const [psalmData, setPsalmData] = useState({ thirdHourPsalms: [], sixthHourPsalms: [] });

  useEffect(() => {
    // Fetch data from the API and update the state
    axios.get("http://192.81.219.24:8080/offering")
      .then((response) => {
        setPsalmData(response.data[1]);
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
      <form onSubmit={handleSubmit}>
        {/* Third Hour Psalm Dropdown */}
        <p className="titles">3rd Hour Psalm</p>
        <div className="psalms">
          <select name="3rdHourPsalm" value={thirdHourPsalm} onChange={handleThirdHourPsalmChange}>
            {psalmData.thirdHourPsalms.map((item, index) => (
              <option key={index} value={item}>
                {item.split("/").slice(-1)[0].split(".")[0]}
              </option>
            ))}
          </select>
        </div>
        <br />
        {/* Sixth Hour Psalm Dropdown */}
        <p className="titles">6th Hour Psalm</p>
        <div className="psalms">
          <select name="6thHourPsalm" value={sixthHourPsalm} onChange={handleSixthHourPsalmChange}>
            {psalmData.sixthHourPsalms.map((item, index) => (
              <option key={index} value={item}>
                {item.split("/").slice(-1)[0].split(".")[0]}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="buttonDiv">
          <button type="submit" className="btn btn-success">
            Submit Form
          </button>
        </div>
        <br />
      </form>
    </div> 
  );
};

export default OfferingPage;
