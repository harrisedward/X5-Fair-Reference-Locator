import React from 'react';
import { Text, StyleSheet } from 'react-native';
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
    	 <React.Fragment>
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
      </React.Fragment>
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
