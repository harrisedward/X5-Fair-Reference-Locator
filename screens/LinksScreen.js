import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';


export default class LinksScreen() {
	
  constructor(props) {
  	super(props)
  	
  	// Bind our functions
  	this.getDocuments() = this.getDocuments.bind(this)
  	
  	this.state = {
  		response: {}
  	}
  }

  function getDocuments() {
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
  			
  			this.setState({
  				response: documents
  			})
  		})
  		.catch(error => {
  			console.log(error);
  		})
  }

  render() {
  	
  	const { response } = this.state
  	var test = "loading...";
  
  	if(response.len > 0) {
  		test = response[0]
  	}
  
  	return (
    	<ScrollView style={styles.container}>
    		{test}
    	</ScrollView>
  	);
  }
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
