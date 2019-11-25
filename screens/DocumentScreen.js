import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
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
      'Mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
  }

  render() {
  	const { response, hasLoaded  } = this.state
    var test = hasLoaded ? response.oer_materials[0] : null;
    	
    return (
      <View style={styles.container}>
        {!hasLoaded ? (
          <Text styles={styles.baseText}>Loading...</Text>   
        ) : (
      		<Card>
        		<CardItem header>
          			<Text>{test.title}</Text>
        		</CardItem>
        	  <CardItem>
              	<Text numberOfLines={1} style={{ width: 100 }}>{test.description}</Text>		
            </CardItem>
            <CardItem footer>
              <Text>{test.creation_date}</Text>
            </CardItem>
          </Card>
        )}
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
