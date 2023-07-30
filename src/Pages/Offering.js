import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css"; // Create a new CSS file for styling

const OfferingPage = () => {
  const location = useLocation();
  const formattedDate = location.state?.formattedDate || "";
  const [Header, setHeader] = useState({});
  
  const [thirdHourPsalm, setThirdHourPsalm] = useState("");
  const [sixthHourPsalm, setSixthHourPsalm] = useState("");
  const [psalmData, setPsalmData] = useState({ thirdHourPsalms: [], sixthHourPsalms: [] });
  const [copticData, setCopticData] = useState({});

  useEffect(() => {
    // Fetch data from the API and update the state
    axios
      .get("http://192.81.219.24:8080/offering")
      .then((response) => {
        setPsalmData(response.data[1]);
        // Set the default values to the first items in the lists
        setThirdHourPsalm(response.data[1].thirdHourPsalms[0] || "");
        setSixthHourPsalm(response.data[1].sixthHourPsalms[0] || "");
        setHeader(response.data[0]);
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
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a copy of the API response to modify it
    const modifiedPsalmData = { ...psalmData };
    modifiedPsalmData.thirdHourPsalms = [thirdHourPsalm];
    modifiedPsalmData.sixthHourPsalms = [sixthHourPsalm];

    // Add any logic for form submission processing here if needed.

    // Send the modified data to the REST API using POST request
    axios
      .post("http://localhost:5000/offering", modifiedPsalmData)
      .then((response) => {
        console.log("API response:", response.data);
        // Redirect to another page after successful submission
        navigate("/");  // Change "/another-page" to the desired URL
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        // Handle any error or show a message to the user
      });
  };
  return (
    <div>
      <div className="center">
      <p className="titles">Current Date is: {formattedDate}</p>
        <p className="titles">Current Coptic Date is: {Header.copticDate}</p>
        <p className="titles">Current Coptic Sunday is: {Header.sunday}</p>
        <p className="titles">Current Coptic Season is: {Header.season}</p>
        <p className="titles">Current Coptic Occasion is: {Header.ocassion}</p>
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
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  ); 
}; 
 
export  default OfferingPage;
