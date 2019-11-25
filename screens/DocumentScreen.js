import React from 'react';
import { Text, StyleSheet, StatusBar } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';


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

  render() {
  	
  	const { response, hasLoaded  } = this.state
  	var test = hasLoaded ? response.oer_materials[0] : null;
  
  	return (
    	 <View style={styles.container}>
    		<StatusBar backgroundColor={'red'} barStyle={'dark-content'} translucent={false} />
        {hasLoaded ? (
          <React.Fragment>
            <Text style={styles.baseText}>creation date:</Text>
            <Text style={styles.baseText}>{test.creation_date}</Text>
            <Text style={styles.baseText}>description</Text>
            <Text style={styles.baseText}>{test.description}</Text>
          </React.Fragment>
        ) : (
          <Text style={styles.baseText}>loading...</Text>
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
