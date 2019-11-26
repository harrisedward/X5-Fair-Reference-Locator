import React from 'react';
import { Text, StyleSheet, StatusBar, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';

import { connect } from 'react-redux';
import * as referenceAction from '../actions/referenceAction';

class ReferencesScreen extends React.Component {
	
  reference(ref, index) {
    return (
      <Text> 
        {ref.title} 
      </Text>
    )
  }

  constructor(props) {
  	super(props)
  }

  render() {
  	return (
  		<View style={styles.container}>
  			{this.props.references.map((reference, i) => this.reference(contact, i))}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    references: state.references
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addReference: ref => dispatch(referenceAction.addReference(ref))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReferencesScreen)
