import React from 'react';
import { Text, StyleSheet, StatusBar, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';

import { connect } from 'react-redux';
import * as referenceAction from '../actions/referenceAction';

class ReferencesScreen extends React.Component {
	
  reference(ref, index) {
    console.log("rendering reference: " + ref);
    return (
      <React.Fragment>
        <Text> {ref.author + ", " + ref.initials + ", " + ref.title + ", " + ref.website_name + ", " + ref.date + ". Available from: " + ref.URL} </Text>
        <Text> </Text>
      </React.Fragment>
    )
  }

  constructor(props) {
  	super(props)
  }

  render() {

    const { references } = this.props;
    
    isReferences = references.length > 0

  	return (
  		<View style={styles.container}>
        <Text style={styles.headerText}>
          Your references
        </Text>
        {isReferences ? (
          <React.Fragment>
  			   {references.map((reference, i) => this.reference(reference, i))}
          </React.Fragment>
        ) : (
          <Text>No references added yet</Text>
        )}
  		</View>
  	);
  }

}

ReferencesScreen.navigationOptions = {
  title: 'Refs',
  tabBarLabel: 'Refs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

const styles = StyleSheet.create({
  baseText: {
    color: '#000'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline' 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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
)(ReferencesScreen)
