import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';


/*
The purpose of this app is to gather basic information from the user
(gender, age, and desired location)to generate a new id for them. 

This app is mainly to learn the following:

1. Using state to render a loading icon while 'fetching' data
2. Using await async functions

We should display the information asked, address, DOB, age, and email

*/
function App() {

  const [gender, updateGender] = useState(null)
  const [age, updateAge] = useState(null)
  const [location, updateLocation] = useState("US")

  const [use, updateUser] = useState({})

  const [loading, setLoading] = useState(false)

  function changeAge(min, max) {
    updateAge(Math.floor(Math.random() * (max - min) + min))
  }
  return (
    <div>
      <p>
        Let's generate a new identity
        </p>
      <div>
        <label for="gender">Choose a gender: </label>
          <select id="gender" value={gender} onChange={(e) => updateGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <br></br>
      <div>
        <label>Choose an age range: </label>
        <button onClick={(e) => changeAge(18, 25)}>18 to 25</button>
        <button onClick={(e) => changeAge(26, 35)}>26 to 35</button>
        <button onClick={(e) => changeAge(36, 55)}>36 to 55</button>
        <button onClick={(e) => changeAge(56, 65)}>56 to 65</button>
        <button onClick={(e) => changeAge(66, 115)}>66 to 115</button>
      </div>
      <br></br>
      <div>
        <label for="locations">Choose a location: </label>
          <select id="locations" value={location} onChange={(e) => updateLocation(e.target.value)}>
          <option value="AU">Australia (AU)</option>
          <option value="NZ">New Zealand (NZ)</option>
          <option value="GB">United Kingdom (GB)</option>
          <option selected value="US">United States (US)</option>
        </select>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));
