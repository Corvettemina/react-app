import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import "./Styling/MatinsPage.css"; // Import your custom CSS file for styling

const VespersPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formattedDate = location.state?.formattedDateString || "";
    const [Header, setHeader] = useState({});
    const [apiData, setApiData] = useState({});
    const [selectedDoxologies, setSelectedDoxologies] = useState([]);
    const [toggleStatus, setToggleStatus] = useState({
        toggle1: false,
        toggle2: false,
        // Add more toggle states if needed
    });

    useEffect(() => {
        // Fetch the API data when the component mounts
        fetchApiData();
    }, []);

    const fetchApiData = () => {
        // Make an API call to get the data (replace 'http://example.com/api' with your API endpoint)
        axios
            .get("http://192.81.219.24:8080/vespers")
            .then((response) => {
                setApiData(response.data[1]);
                setHeader(response.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching API data:", error);
            });
    };

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if (selectedDoxologies.includes(value)) {
            setSelectedDoxologies((prevState) =>
                prevState.filter((item) => item !== value)
            );
        } else {
            setSelectedDoxologies((prevState) => [...prevState, value]);
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
        // Handle form submission logic here with the selectedDoxologies state
        const modifiedVespersData = { ...apiData };
        modifiedVespersData.seasonVespersDoxologies = [selectedDoxologies];
        modifiedVespersData.vespersLitanyofTheGospel = toggleStatus.toggle1 ? "Alternate" : "Standard";
        modifiedVespersData.vespers5ShortLitanies = toggleStatus.toggle2 ? "Yes" : "No";
        console.log(modifiedVespersData);
        console.log("Selected Doxologies:", selectedDoxologies);
        axios
            .post("http://localhost:5000/vespers", modifiedVespersData)
            .then((response) => {
                console.log("API response:", response.data);
                // Redirect to another page after successful submission
                navigate("/matins", { state: { formattedDate } });  // Change "/another-page" to the desired URL
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
                <p className="titles">Current Coptic Date is: {Header.copticDate}</p>
                <p className="titles">Current Coptic Sunday is: {Header.sunday}</p>
                <p className="titles">Current Coptic Season is: {Header.season}</p>
                <p className="titles">Current Coptic Occasion is: {Header.ocassion}</p>
                <br />

                {apiData.seasonVespersDoxologies && apiData.seasonVespersDoxologies.length > 0 ? (
                    <div>
                        <p className="titles">Seasonal Vespers Doxologies</p>
                        {apiData.seasonVespersDoxologies.map((item, index) => (
                            <div className="zone" key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="seasonalDoxoMatins"
                                        value={item}
                                        checked={selectedDoxologies.includes(item)}
                                        onChange={handleCheckboxChange}
                                    />
                                    {item.split("/").slice(-1)[0].split(".")[0]}
                                </label>
                            </div>
                        ))}
                        <br />
                    </div>
                ) : null}

                

                <div className="buttonDiv">
                <p className="titles">Litany of the Gospel:</p>
                    <label className="switch">

                        <input
                            type="checkbox"
                            name="toggle1"
                            checked={toggleStatus.toggle1}
                            onChange={handleToggleClick}
                            className="slider"
                        />
                        <span className="slider"></span>
                    </label>

                </div>
                <span>{toggleStatus.toggle1 ? "Alternate" : "Standard"}</span>
                <div className="buttonDiv">
                <p className="titles">5 Short Litanies:</p>

                    <label className="switch">
                        <input
                            type="checkbox"
                            name="toggle2"
                            checked={toggleStatus.toggle2}
                            onChange={handleToggleClick}
                            className="slider"
                        />
                        <span className="slider"></span>
                    </label>

                </div>
                <span>{toggleStatus.toggle2 ? "Yes" : "No"}</span>

                <div className="buttonDiv">
                    <button type="submit" className="btn btn-success">
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VespersPage;
