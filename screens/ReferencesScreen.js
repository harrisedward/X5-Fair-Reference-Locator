import React from 'react';
import { Text, StyleSheet, StatusBar } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';


export default class ReferencesScreen extends React.Component {
	
  constructor(props) {
  	super(props)
  }

  render() {
  	return (
  		<View style={styles.container}>
  			<Text style={styles.baseText}>Need to create...</Text>
  		</View>
  	);
  }

}