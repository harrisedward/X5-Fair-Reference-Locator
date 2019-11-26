import React from 'react';
import { Text, StyleSheet, StatusBar, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';

import { connect } from 'react-redux';
import * as referenceAction from '../actions/referenceAction';

class ArticlesScreen extends React.Component {

  constructor(props) {
  	super(props)
  	
  	this.toggleReference = this.toggleReference.bind(this)
  }

  toggleReference(index) {
    console.log("Add reference: " + index)

    const { response } = this.state
    let article = response.oer_materials[index]

    let ref = {
      title: article.title
    }

    this.props.addReference(ref);
  }
  
  render() {
  	
  	const { navigation } = this.props
  	
  	const doc = navigation.getParam('doc', {})
  
  	return (
  		<View style={styles.container}>
          <Text>{doc.title}</Text>
  		</View>
  	)
  }
}

ArticlesScreen.navigationOptions = {
  title: 'Articles',
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

const mapStateToProps = (state) => ({
    references: state.references,
})

const mapDispatchToProps = (dispatch) => ({
  addReference: ref => dispatch(referenceAction.addReference(ref)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesScreen)
