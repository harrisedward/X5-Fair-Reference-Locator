import React from 'react';
import { ScrollView, Text, StyleSheet, StatusBar, View, Button } from 'react-native';
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

  toggleReference() {
    console.log("Add reference")
    
    const { navigation } = this.props
    
    const article = navigation.getParam('doc', {})
    var todaysDate = moment(Date(article.creation_date)).format('DD-MM-YYYY');

    let ref = {
      author: "N/A",
      initials: "Wikipedia",
      title: article.title,
      website_name: article.provider.provider_name,
      date: todaysDate,
      URL: article.url
    }

    this.props.addReference(ref);
  }
  
  render() {
  	
  	const { navigation } = this.props
  	
  	const doc = navigation.getParam('doc', {})
  	var newDate = moment(Date(doc.creation_date)).format('DD-MM-YYYY');
  
  	return (
  		 <ScrollView style={styles.container}>
             <Card>
          		  <CardItem header>
            			<Text style={styles.headerText}>{doc.title}</Text>
          		  </CardItem>
                <CardItem>
                  <Text>{newDate}</Text>
                </CardItem>
          	    <CardItem>
                	  <Text numberOfLines={30} style={{ width: 310 }}>{doc.description}</Text>		
              	</CardItem>
                <CardItem footer>
                   <Button
                    title="Add to references"
                    onPress={this.toggleReference}
                  />
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline' 
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    margin: 20,
    backgroundColor: '#fff',
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
