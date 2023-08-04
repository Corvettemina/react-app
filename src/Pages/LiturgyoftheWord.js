import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Styling/LiturgyPage.css"; // Import your custom CSS file for styling

const LiturgyoftheWordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formattedDate = location.state?.formattedDate || "";
  const [selectedParalex, setSelectedParalex] = useState([]);
  const [copticData, setCopticData] = useState({});
  const [liturgyData, setLiturgyData] = useState({});
  const [toggleStatus, setToggleStatus] = useState({
    liturgyGospelLitany: false
  });

  useEffect(() => {
    // Fetch the API data when the component mounts
    fetchApiData();
  }, []);

  const fetchApiData = () => {
    // Make an API call to get the data (replace 'http://example.com/api' with your API endpoint)
    axios
      .get("http://192.81.219.24:8080/liturgyOfWord")
      .then((response) => {
        setCopticData(response.data[0]);
        setLiturgyData(response.data[1]);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  };
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedParalex.includes(value)) {
        setSelectedParalex((prevState) =>
            prevState.filter((item) => item !== value)
        );
    } else {
        setSelectedParalex((prevState) => [...prevState, value]);
    }
};
  const handleToggleClick = (event) => {
    const { name, checked } = event.target;
    setToggleStatus((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here with the toggleStatus state
    console.log("Toggle Status:", toggleStatus);
    const modifiedLiturgyOftheWord = {...liturgyData};
    modifiedLiturgyOftheWord.paralexHymns = [selectedParalex]
    modifiedLiturgyOftheWord.LiturgylitanyoftheGospel = toggleStatus.liturgyGospelLitany ? "Standard" : "Alternate";
    axios
      .post("http://localhost:5000/liturgyOfWord", modifiedLiturgyOftheWord)
      .then((response) => {
        console.log("API response:", response.data);
        // Redirect to another page after successful submission
        //navigate("/next-page", { state: { formattedDate } }); // Change "/next-page" to the desired URL
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        // Handle any error or show a message to the user
      });
  };

  return (
    <div className="center">
      <form onSubmit={handleSubmit} className="offering-form">
        <p className="titles">Current Date is: {formattedDate}</p>
        <p className="titles">Current Coptic Date is: {copticData.copticDate}</p>
        <p className="titles">Current Coptic Sunday is: {copticData.sunday}</p>
        <p className="titles">Current Coptic Season is: {copticData.season}</p>
        <p className="titles">Current Coptic Occasion is: {copticData.ocassion}</p>
        {liturgyData.paralexHymns && liturgyData.paralexHymns.length > 0 && (
          <>
            <br />
            <p className="titles">Paralex Hymns</p>
            <div className="zone">
              <div className="container">
                {liturgyData.paralexHymns.map((item, index) => (
                  <div className="zone" key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name="paralexHymns"
                        value={item}
                        checked={selectedParalex.includes(item)}
                        onChange={handleCheckboxChange}
                      />
                      {item.split("/").slice(-1)[0].split(".")[0]}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <br />
          </>
        )}

        <div className="buttonDiv">
          <span>Litany of the Gospel</span>
          <br />
          <label className="switch">
            <input
              type="checkbox"
              name="liturgyGospelLitany"
              checked={toggleStatus.liturgyGospelLitany}
              onChange={handleToggleClick}
              className="slider"
            />
            <span className="slider"></span>
          </label>
        </div>
        <span>{toggleStatus.liturgyGospelLitany ? "Standard" : "Alternate"}</span>

        <div className="buttonDiv">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiturgyoftheWordPage;
