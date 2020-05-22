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

  const [gender, updateGender] = useState("male")
  const [age, updateAge] = useState(null)
  const [location, updateLocation] = useState("US")

  const [user, updateUser] = useState(null)

  const [loading, setLoading] = useState(false)

  function changeAge(min, max) {
    updateAge(Math.floor(Math.random() * (max - min) + min))
  }

  async function retrieveID() {
    let api = 'https://randomuser.me/api/?gender='+ gender + '&nat=' + location + '&age=' + age
    setLoading(true);
    let user = null
    await axios.get(api).then(response => {
      user = {
        "name": response.data.results[0].name.first + " " +  response.data.results[0].name.last,
        "age": response.data.results[0].dob.age,
        "dob": response.data.results[0].dob.date,
        "phone": response.data.results[0].phone,
        "email": response.data.results[0].email,
        "city": response.data.results[0].location.city,
         "country": response.data.results[0].location.country,
          "state": response.data.results[0].location.state,
      }
    }).catch(response => {
      setLoading(false)
    })

    const delay = (ms) => new Promise(r => setTimeout(r, ms))
    await delay(3000)
    setLoading(false)
  }
  return (
    <div>
      {loading == false && user == null && <div>
      <p>
        Let's generate a new identity
        </p>
      <div>
        <label for="gender">Choose a gender: </label>
          <select id="gender" value={gender} onChange={(e) => updateGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
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
       <br></br>
      {age && location && gender && 
        <button onClick={() => retrieveID()}>Submit</button>
      }
      </div>}
    </div>
  );
}

render(<App />, document.getElementById('root'));
