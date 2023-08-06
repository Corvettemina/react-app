import React, { useState, useEffect } from 'react';
//import "./Styling/MatinsPage.css"; // Import your custom CSS file for styling
import axios from 'axios';
import './Styling/MatinsPage.css';
const LiturgyOfTheFaithfulPage = () => {
  const [selectedReconiliation, setSelectedReconiliation] = useState('');
  const [selectedFraction, setSelectedFraction] = useState('');
  const [toggleStatus, setToggleStatus] = useState({
    rejoiceOMary: false,
    anaphora: false,
    OLordofHosts: false,
    agiosLiturgy: false,
    instiution: false,
    yeahWeAskYou: false,
    jeNaiNan: false,
    healingToThesick: false,
    Commemoration: false,
    postCommemoration: false,
    prefaceToTheFraction: false,
    // Add more toggle states if needed
  });
  useEffect(() => {
    // Fetch the API data when the component mounts
    fetchApiData();
  }, []);
  const handleReconiliationChange = (e) => {
    setSelectedReconiliation(e.target.value);
  };

  const [apiData, setApiData] = useState({});
  const [Header, setHeader] = useState({});
  const fetchApiData = () => {
    // Make an API call to get the data (replace 'http://example.com/api' with your API endpoint)
    axios
      .get('http://192.81.219.24:8080/liturgyOfFaithful')
      .then((response) => {
        setApiData(response.data[1]);
        setHeader(response.data[0]);
        setSelectedReconiliation(
          response.data[1].prayerOfReconcilation[0] || ''
        );
        console.log(apiData.prayerOfReconcilation);
      })
      .catch((error) => {
        console.error('Error fetching API data:', error);
      });
  };

  const handleToggleClick = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === 'checkbox' ? event.target.checked : value;

    setToggleStatus((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a copy of the API response to modify it

    // Add any logic for form submission processing here if needed.

    // Send the modified data to the REST API using POST request
    axios
      .post('http://localhost:5000/offering')
      .then((response) => {
        console.log('API response:', response.data);
        // Redirect to another page after successful submission
        //navigate("/liturgyofword");  // Change "/another-page" to the desired URL
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        // Handle any error or show a message to the user
      });
  };
  return (
    <div className='center'>
      <form onSubmit={handleSubmit} className='offering-form'>
        <p className='titles2'>LITURGY OF THE FAITHFUL</p>

        {/* Reconciliation Prayer */}
        <div className='form-group'>
          <label htmlFor='prayerOfReconcilation' className='titles'>
            Reconciliation Prayer
          </label>
          <select
            id='prayerOfReconcilation'
            name='prayerOfReconcilation'
            value={selectedReconiliation}
            onChange={handleReconiliationChange}
            className='form-control'
          >
            {apiData.prayerOfReconcilation ? (
              apiData.prayerOfReconcilation.map((item, index) => (
                <option key={index} value={item}>
                  {item.split('/').slice(-1)[0].split('.')[0]}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
        </div>
        {/* Rejoice O Mary */}
        <p className='titles'>Rejoice O Mary</p>

        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='rejoiceOMary'
                checked={toggleStatus.rejoiceOMary}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.rejoiceOMary ? 'Yes' : 'No'}</span>
        <br></br>
        <br></br>
        <br></br>
        {/* Anaphora */}
        <p className='titles'>Anaphora</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='anaphora'
                checked={toggleStatus.anaphora}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.anaphora ? 'Gregory' : 'Basil'}</span>
        <br></br>
        <br></br>
        <br></br>
        {/* O Lord of Hosts */}
        <p className='titles'>O Lord of Hosts</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='OLordofHosts'
                checked={toggleStatus.OLordofHosts}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.OLordofHosts ? 'Yes' : 'No'}</span>
        <br></br>
        <br></br>
        <br></br>
        {/* Agios */}
        <p className='titles'>Agios</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='agiosLiturgy'
                checked={toggleStatus.agiosLiturgy}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.agiosLiturgy ? 'Gregory' : 'Basil'}</span>
        <br></br>
        <br></br>
        <br></br>

        {/* instiution */}
        <p className='titles'>Instiution Narrative</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='instiution'
                checked={toggleStatus.instiution}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.instiution ? 'Gregory' : 'Basil'}</span>
        <br></br>
        <br></br>
        <br></br>

        {/* yeahWeAskYou */}
        <p className='titles'>Yea We Ask You</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='yeahWeAskYou'
                checked={toggleStatus.yeahWeAskYou}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.yeahWeAskYou ? 'Yes' : 'No'}</span>

        <br></br>
        <br></br>
        <br></br>

        {/* yeahWeAskYou */}
        <p className='titles'>Have Mercy (Je Nai Nan)</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='jeNaiNan'
                checked={toggleStatus.jeNaiNan}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.jeNaiNan ? 'Yes' : 'No'}</span>

        <br></br>
        <br></br>
        <br></br>

        {/* yeahWeAskYou */}
        <p className='titles'>Healing to The Sick</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='healingToThesick'
                checked={toggleStatus.healingToThesick}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.healingToThesick ? 'Yes' : 'No'}</span>


        <br></br>
        <br></br>
        <br></br>
        {/* Commemoration */}
        <p className='titles'>Commemoration</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='Commemoration'
                checked={toggleStatus.Commemoration}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.Commemoration ? 'Gregory' : 'Basil'}</span>


        <br></br>
        <br></br>
        <br></br>
        {/* postCommemoration */}
        <p className='titles'>Post Commemoration</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='postCommemoration'
                checked={toggleStatus.postCommemoration}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.postCommemoration ? 'Gregory' : 'Basil'}</span>
        

        
        <br></br>
        <br></br>
        <br></br>
        {/* postCommemoration */}
        <p className='titles'>Preface To The Fraction</p>
        <div className='fields' id='donate'>
          <p>
            <label className='switch'>
              <input
                className='slider'
                type='checkbox'
                name='prefaceToTheFraction'
                checked={toggleStatus.prefaceToTheFraction}
                onChange={handleToggleClick}
              />
              <span className='slider'></span>
            </label>
          </p>
        </div>
        <br></br>
        <span>{toggleStatus.prefaceToTheFraction ? 'Gregory' : 'Basil'}</span>
        <p className='titles'>Seasonal Fractions</p>
        <div className='break2'>
          <br />
        </div>
        <div className='psalms'>
          <div className='psalms'>
            <select name='seasonalFraction' id=''>
              <option className='fields' value=''>
                Select Fraction
              </option>
            </select>
            <br />
            <div className='break'>
              <br />
            </div>
          </div>
        </div>

        <p className='titles'>Fraction Index</p>
        <div className='break2'>
          <br />
        </div>
        <div className='psalms'>
          <div className='psalms'>
            <select name='fractionIndex' id=''>
              <option className='fields' value=''>
                Select Fraction
              </option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LiturgyOfTheFaithfulPage;
