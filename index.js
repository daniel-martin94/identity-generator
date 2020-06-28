import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import User from './User'
import { Transition, Dimmer, Loader, Image, Container, Divider, Header, Button, Icon, Grid, Select, Button } from 'semantic-ui-react'
import { Slider } from "react-semantic-ui-range";

function App() {

  const [gender, updateGender] = useState(null)
  const [age, updateAge] = useState(null)
  const [location, updateLocation] = useState(null)
  const [value, setValue] = useState(18);
  const [user, updateUser] = useState(null)

  //Determines the users window size and changes layout accordingly
  const [isMobile, toggleMobile] = useState()
  const [width, setWidth] = useState(window.innerWidth);

  const [loading, setLoading] = useState(false)

  async function retrieveID() {
    let api = 'https://randomuser.me/api/?gender=' + gender + '&nat=' + location + '&age=' + age
    setLoading(true);
    let tempUser = null
    await axios.get(api).then(response => {
      tempUser = {
        "name": response.data.results[0].name.first + " " + response.data.results[0].name.last,
        "age": response.data.results[0].dob.age,
        "dob": response.data.results[0].dob.date,
        "phone": response.data.results[0].phone,
        "email": response.data.results[0].email,
        "city": response.data.results[0].location.city,
        "country": response.data.results[0].location.country,
        "state": response.data.results[0].location.state,
        "photo": response.data.results[0].picture.large,
        "id": response.data.results[0].id.value
      }
      
    }).catch(response => {
      updateUser(null)
      setLoading(false)
    })

    const delay = (ms) => new Promise(r => setTimeout(r, ms))
    await delay(3000).then(() =>{
      updateUser(tempUser)
      setLoading(false)
    }).catch((err) => {
      updateUser(null)
      setLoading(false)
    })

    // updateUser(tempUser)
    // setLoading(false)
  }

  const sliderSettings = {
    start: 18,
    min: 18,
    max: 80,
    step: 1,
    onChange: value => {
      updateAge(value);
      setValue(value)
    }
  };

  const countryOptions = [
    { key: 'AU', value: 'AU', text: 'Australia' },
    { key: 'BR', value: 'BR', text: 'Brazil' },
    { key: 'CA', value: 'CA', text: 'Canada' },
    { key: 'DE', value: 'DE', text: 'Germany' },
    { key: 'DK', value: 'DK', text: 'Denmark' },
    { key: 'ES', value: 'ES', text: 'Spain' },
    { key: 'FI', value: 'FI', text: 'Finland' },
    { key: 'FR', value: 'FR', text: 'France' },
    { key: 'GB', value: 'GB', text: 'United Kingdom' },
    { key: 'IE', value: 'IE', text: 'Ireland' },
    { key: 'IR', value: 'IR', text: 'Iran' },
    { key: 'NL', value: 'NL', text: 'Netherlands' },
    { key: 'NZ', value: 'NZ', text: 'New Zealand' },
    { key: 'TR', value: 'TR', text: 'United States' },
  ]

  function changeLocation(e, data) {
    updateLocation(data.value)
  }

  //Handles resizing width
useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
});

//Determines if mobile
useEffect(() => {
    if (width <= 812) {
        toggleMobile(true)
    } else {
      toggleMobile(false)
    }
}, [width]);
console.log(user)
console.log(loading)
  return (
    <Container>
      <div styles="padding:10px"></div>
      <Header as="h2">Identity Generator</Header>
      <Divider />
      {loading == false && user == null && <div>

        <Grid>
          <Grid.Column width={isMobile ? 6 : 8}>
            <div>
              <Header
                as='h3'
                content='Gender'
              />
              <Button basic={!(gender == "male")} color='blue' onClick={() => updateGender("male")}>
              {!isMobile &&
                <Icon name="male">
                </Icon>
              }
              
              {!isMobile ? "Male" : "M"}
          </Button>
              <Button basic={!(gender == "female")} color='pink' onClick={() => updateGender("female")}>
                {!isMobile &&
                <Icon name="female">
                </Icon>
                }
              
              {!isMobile ? "Female" : "F"}
          </Button>
            </div>
          </Grid.Column>
          <Grid.Column width={isMobile ? 10 : 8}>
            <Header
              as='h3'
              content="Location"
            />
            <Select onChange={changeLocation} placeholder='Select your country' options={countryOptions} />
          </Grid.Column>
        </Grid>

        <Grid.Column>
            <div>
              <Grid>
                <Grid.Column floated='left' width={14}>
                  <Header
                    as='h3'
                    content='Age'
                  />
                </Grid.Column>
                <Grid.Column floated='right' width={2}>
                  <Header
                    as='h3'
                    disabled
                    content={age}
                  />
                </Grid.Column>
                <Grid.Column width={16}>
                  <Slider value={value} color="blue" settings={sliderSettings} />
                </Grid.Column>
              </Grid>
            </div>
          </Grid.Column>

          <br></br>
          <Transition visible={age !== null && gender !== null && location !== null} animation='fade left' duration={1000}>
          <Button
                floated='right'
                content="Generate"
                size="medium"
                icon="arrow circle right"
                onClick={() => retrieveID()}
                labelPosition="right"
          />
          </Transition>
        
      </div>}

     {loading === true &&
        <Dimmer active inverted>
          <Loader inverted>Generating a new identity...</Loader>
        </Dimmer>
      }

      <Transition visible={user !== null && loading === false} animation='fade left' duration={1000}>
        <Container>
          <User user={user}></User>
          <Button
                floated='right'
                content="Regenerate"
                size="medium"
                icon="refresh"
                onClick={() => retrieveID()}
                labelPosition="right"
          />
        </Container>
      </Transition>
    </Container>
  );
}

render(<App />, document.getElementById('root'));
