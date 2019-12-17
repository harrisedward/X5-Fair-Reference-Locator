import React from 'react';
import { ScrollView, StyleSheet, StatusBar, View, TouchableOpacity} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import moment from 'moment';

import { connect } from 'react-redux';
import * as referenceAction from '../actions/referenceAction';

class DocumentsScreen extends React.Component {
	
  constructor(props) {
  	super(props)
  	
  	// Bind our functions
  	this.getDocuments = this.getDocuments.bind(this)
  	
  	this.openDocument = this.openDocument.bind(this)
  	
  	this.state = {
      hasLoaded: false,
  		response: {},
      documents: [],
  	}

    this.getDocuments();
  }

  getDocuments() {
  	const PLATFORM_URL = "https://platform.x5gon.org/api/v1"
  	const ENDPOINT = "/search"
  	const url = PLATFORM_URL + ENDPOINT
  	
  	axios.get(url, {
      params: {
        text: "biology",
        type: "text",
        page: 1,
      }
    })
  		.then(res => {
  			const documents = res.data.rec_materials;
  			
        console.log(documents)

  			this.setState({
          hasLoaded: true,
  				documents: documents
  			})
  		})
  		.catch(error => {
  			console.log(error);
  		})
  }

  openDocument(index){
    console.log("Running...")
    const { documents  } = this.state
    
  	this.props.navigation.navigate('Articles', {
  		doc: documents[index]
  	})
  }
	
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
  }

  render() {
  	const { documents, hasLoaded  } = this.state

    var articles = hasLoaded ? documents : [];
    
    return (
        <>
        {!hasLoaded ? (
          <View style={styles.centerContainer}>
            <Text styles={styles.baseText}>Loading...</Text>   
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
          		{ articles.map((article, i) => {
          		  return ( 
                  <TouchableOpacity onPress={ () => {this.openDocument(i)} } style={styles.card}>
                    <Card style={styles.card}>
                  		<CardItem style={styles.header}>
                  			<Body>
                          <Text style>{article.title}</Text>
                          <Text note>{article.provider}</Text>
                        </Body>
                  		</CardItem>
                      <CardItem style={styles.curvedCardItem}>
                        	<Text numberOfLines={4} style={styles.description}>{article.description}</Text>    
                    	</CardItem>
                  	</Card>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      	</>
    )
  }
}

DocumentsScreen.navigationOptions = {
  title: 'Docs',
  tabBarLabel: 'Docs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

const styles = StyleSheet.create({
  baseText: {
    color: '#000'
  },
  header: {
    borderRadius: 20,
  },
  curvedCardItem: {
    borderRadius: 20,
  },
  card: {
    borderRadius: 20,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
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
)(DocumentsScreen)
