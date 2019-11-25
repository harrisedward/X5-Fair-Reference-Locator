import React from 'react';
import { Text, StyleSheet, StatusBar } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';


export default class LinksScreen extends React.Component {
	
  constructor(props) {
  	super(props)
  	
  	// Bind our functions
  	this.getDocuments = this.getDocuments.bind(this)
  	
  	this.state = {
      hasLoaded: false,
  		response: {}
  	}

    this.getDocuments();
  }

  getDocuments() {
  	// TODO Query logic
  	const PLATFORM_URL = "https://platform.x5gon.org/api/v1"
  	const ENDPOINT = "/oer_materials"
  	const url = PLATFORM_URL + ENDPOINT

  	params = {
      	"languages": ["en"], 
      	"limit": 10, 
      	"page": 1
  	}
  	
  	axios.get(url, params)
  		.then(res => {
  			const documents = res.data;
  			
        console.log(documents)

  			this.setState({
          hasLoaded: true,
  				response: documents
  			})
  		})
  		.catch(error => {
  			console.log(error);
  		})
  }

async componentWillMount() {
  await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });
}

export deafult class CardHeaderExample extends Component {
	const { response, hasLoaded  } = this.state
  	var test = hasLoaded ? response.oer_materials[0] : null;
  
  render() {
  
  const { response, hasLoaded  } = this.state
  	var test = hasLoaded ? response.oer_materials[0] : null;
  	
    return (
		<Header />
        	<Content>
          		<Card>
            		<CardItem header>
              			<Text>{test.header}</Text>
            		</CardItem>
            	<CardItem>
              		<Body>
                		<Text>
                  	<Text numberOfLines={1} style={{ width: 100 }}>{test.description}<Text>		
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>{test.creation_date}</Text>
            </CardItem>
         </Card>
        </Content>
    </Container>
    );
   } 
}
LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  baseText: {
    color: '#000'
  },
});
