import React from 'react';
import { Text, StyleSheet, StatusBar, View } from 'react-native';
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

ReferencesScreen.navigationOptions = {
  title: 'Refs',
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