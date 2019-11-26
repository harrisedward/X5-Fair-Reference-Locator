import React from 'react';
import { ScrollView, Text, StyleSheet, StatusBar, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import moment from 'moment';



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
  	var newDate = moment(Date(doc.creation_date)).format('DD-MM-YYYY');

  
  	return (
  		 <ScrollView>
             <Card>
          		<CardItem header>
            			<Text>{doc.title}</Text>
          		</CardItem>
          	    <CardItem>
                	  <Text numberOfLines={30} style={{ width: 310 }}>{doc.description}</Text>		
              	</CardItem>
                	<CardItem footer>
                  	<Text>{newDate}</Text>
              	</CardItem>
             </Card>
      </ScrollView>
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
)(ArticlesScreen)
