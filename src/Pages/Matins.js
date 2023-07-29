import React, { useState, useEffect } from "react";
import axios from "axios";

const MatinsPage = () => {
  const [selectedDoxologies, setSelectedDoxologies] = useState([]);
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    // Fetch the API data when the component mounts
    fetchApiData();
  }, []);

  const fetchApiData = () => {
    // Make an API call to get the data (replace 'http://example.com/api' with your API endpoint)
    axios
      .get("http://192.81.219.24:8080/matins")
      .then((response) => {
        setApiData(response.data[0]);
        setSelectedDoxologies(response.data[1])
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  };

  const handleDoxologyChange = (e) => {
    const value = e.target.value;
    setSelectedDoxologies((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If already selected, remove it from the list
        return prevSelected.filter((item) => item !== value);
      } else {
        // If not selected, add it to the list
        return [...prevSelected, value];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Selected doxologies:", selectedDoxologies);
    // Redirect to another page after successful submission
    // You can use the "useHistory" hook to redirect to the desired page
    // For example: import { useHistory } from "react-router-dom"; and use useHistory().push("/another-page");
  };

  return (
    <div className="center">
      <form onSubmit={handleSubmit} className="offering-form">
        <p className="titles">Selected Date is: {apiData.copticDate}</p>
        <p className="titles">Selected Coptic Sunday is: {apiData.sunday}</p>
        <p className="titles">Selected Coptic Season is: {apiData.season}</p>
        <p className="titles">Selected Coptic Occasion is: {apiData.occasion}</p>
        <br />

        {apiData.seasonmatinsDoxologies && apiData.seasonmatinsDoxologies.length > 0 ? (
          <div>
            <p className="titles">Seasonal Matins Doxologies</p>
            {apiData.seasonmatinsDoxologies.map((item, index) => (
              <div className="zone" key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={item}
                    checked={selectedDoxologies.includes(item)}
                    onChange={handleDoxologyChange}
                  />
                  {item.split("/").slice(-1)[0].split(".pptx")[0]}
                </label>
              </div>
            ))}
            <br />
          </div>
        ) : null}

        {/* Rest of the form elements */}
        {/* ... */}

        <div className="buttonDiv">
          <button type="submit" className="btn btn-success">
            Next
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default MatinsPage;
