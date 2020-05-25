import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Card, Icon, Image, List, Container } from 'semantic-ui-react'
import moment from 'moment'

const User = (props) => {
  let { user } = props
  const [birthday, updateBirthday] = useState(user.dob)

  const months = {
    0:"Jan",
    1:"Feb",
    2:"Mar",
    3:"Apr",
    4:"May",
    5:"Jun",
    6:"Jul",
    7:"Aug",
    8:"Sep",
    9:"Oct",
    10:"Nov",
    11:"Dec"
  }

  useEffect(()=>{
    let readableBirthday = new Date(user.dob)
    updateBirthday(months[readableBirthday.getMonth()] + " " + readableBirthday.getUTCDate() + ", " + readableBirthday.getUTCFullYear())
  }, [])
  return (
    <Container>
      <Card>
        <Image src={user.photo} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>
            <span>Age: {user.age}</span>
          </Card.Meta>
          <Card.Description>
            <a>{user.email}</a>
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <List>
            <List.Item>
              <List.Icon name='phone' />
              <List.Content>
                <a>{user.phone}</a>
              </List.Content>
            </List.Item>
              <List.Item>
              <List.Icon name='birthday' />
              <List.Content>
                <a>{birthday}</a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>{user.city}, {user.state} - {user.country}</List.Content>
            </List.Item>
            {user.id !== null && 
            <List.Item>
              <List.Icon name='hashtag' />
              <List.Content>
                <a>{user.id}</a>
              </List.Content>
            </List.Item>
            }
          </List>
        </Card.Content>
      </Card>
    </Container>
  )

}


export default User