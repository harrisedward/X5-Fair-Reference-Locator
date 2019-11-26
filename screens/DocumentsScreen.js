import React from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity} from 'react-native';
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
    this.toggleReference = this.toggleReference.bind(this)
  	
  	this.state = {
      hasLoaded: false,
  		response: {}
  	}

    this.getDocuments();
  }

  getDocuments() {
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
  			
        // console.log(documents)

  			this.setState({
          hasLoaded: true,
  				response: documents
  			})
  		})
  		.catch(error => {
  			console.log(error);
  		})
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

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
  }

  render() {
  	const { response, hasLoaded  } = this.state

    var test = hasLoaded ? response.oer_materials[0] : null;
    
    if(hasLoaded) {
      var newDate = moment(Date(test.creation_date)).format('DD-MM-YYYY');
    }

    return (
      <View style={styles.container}>
        {!hasLoaded ? (
          <Text styles={styles.baseText}>Loading...</Text>   
        ) : (
          <TouchableOpacity onPress={ () => {this.toggleReference(0)} }>
        		<Card>
          		<CardItem header>
            			<Text>{test.title}</Text>
          		</CardItem>
          	  <CardItem>
                	<Text numberOfLines={4} style={{ width: 310 }}>{test.description}</Text>		
              </CardItem>
              <CardItem footer>
                <Text>{newDate}</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
        )}
      </View>
    );
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
)(DocumentsScreen)
