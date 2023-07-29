// App.js
import React from "react";
import { Routes , Route } from "react-router-dom";
//import Routeing from "./Routeing";
import OfferingPage from "./Pages/Offering";
import PowerPointCreator from "./Pages/Home";
import MatinsPage from "./Pages/Matins";

const App = () => {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route exact path="/" Component={PowerPointCreator} />
      <Route path="/offering" Component={OfferingPage} />
      <Route path="/matins" Component={MatinsPage} /> {/* Replace with your next page component */}
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default App;
