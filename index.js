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
  const [location, updateLocation] = useState(null)

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
        {gender == null && <h3> Select Gender </h3>}
        {gender != null && <h3> Gender Selected: {gender} </h3>}
        <button onClick={() => updateGender("Male")}>Male</button>
        <button onClick={() => updateGender("Female")}>Female</button>
      </div>
      <div>
        {age == null && <h3> Select Age </h3>}
        {age != null && <h3> Age Selected: {age} </h3>}
        <button onClick={(e) => changeAge(18, 25)}>18 to 25</button>
        <button onClick={(e) => changeAge(26, 35)}>26 to 35</button>
        <button onClick={(e) => changeAge(36, 55)}>36 to 55</button>
        <button onClick={(e) => changeAge(56, 65)}>56 to 65</button>
        <button onClick={(e) => changeAge(66, 115)}>66 to 115</button>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));
