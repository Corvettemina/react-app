import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css"; // Import your custom styles

const PowerPointCreator = () => {
  const [startDate, setStartDate] = useState(null);
  const [copticData, setCopticData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the API data when the component mounts
    fetchApiData();
  }, []);

  const fetchApiData = () => {
    // Make an API call to get the data (replace 'http://example.com/api' with your API endpoint)
    fetch("http://192.81.219.24:8080/home")
      .then((response) => response.json())
      .then((data) => {
        setCopticData(data);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = startDate.toLocaleDateString("en-CA");
    console.log("Selected date:", formattedDate);
    // Handle form submission logic here
    axios
    .post("http:///192.81.219.24:8080/date?date="+formattedDate)
    .then((response) => {
      console.log("API response:", response.data);
      // Redirect to another page after successful submission
      navigate("/offering");  // Change "/another-page" to the desired URL
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      // Handle any error or show a message to the user
    });
  };

  return (
    <div className="centerVert">
      <div className="homePage">
        <p className="titles">Current Coptic Date is: {copticData.copticDate}</p>
        <p className="titles">Current Coptic Sunday is: {copticData.sunday}</p>
        <p className="titles">Current Coptic Season is: {copticData.season}</p>
        <p className="titles">Current Coptic Occasion is: {copticData.occasion}</p>
        <form onSubmit={handleSubmit} name="myform" className="datepicker">
          <div className="homePage titles2">Select Date</div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="datepicker"
          />
        <div className="buttonDiv">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default PowerPointCreator;
