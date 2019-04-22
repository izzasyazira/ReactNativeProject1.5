import React from 'react';
import { StyleSheet, Text, Image, ImageBackground, FlatList, View,  } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Input } from './components/input';
import { Button } from './components/button';




const userInfo = { username: 'admin', password: 'admin' }

export default class App extends React.Component {


  state = {
    email: '',
    password: '',
    authenticating: false,
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

class register extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'white'
    }
  }

  render() {
    return (
      <ImageBackground source={require('./background.jpg')} style={styles.container}>
        <Image style={styles.image} source={require('./logo.gif')} />
        <Input
          placeholder='Enter name'
          label='Name'
        />
        <Input
          placeholder='Enter email'
          label='Email'
        />

        <Input
          placeholder='Enter password'
          label='Password'
          secureTextEntry
        />

        <Button
          title='Register'
          onPress={() => this.props.navigation.navigate('Home')}
        >Register</Button>

        <Text style={styles.text2}> Already have an account. <Text
          title='Login'
          onPress={() => this.props.navigation.navigate('Home')}
        >LOGIN</Text> </Text>

      </ImageBackground>
    );
  }
}

class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''

    }
  }

  render() {

    return (
      <ImageBackground source={require('./background.jpg')} style={styles.container}>
        <Image style={styles.image} source={require('./logo.gif')} />
        <Input
          placeholder='Enter email'
          label='Email'
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}

        />

        <Input
          placeholder='Enter password'
          label='Password'
          secureTextEntry
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />

        <Button
          title='Login'
          onPress={this._login}
        // onPress = { () => this.props.navigation.navigate('Homepage')}
        >Login</Button>

        <Text style={styles.text2}> Don't have an account yet? <Text
          title='Register'
          onPress={() => this.props.navigation.navigate('Register')}
        >REGISTER</Text> </Text>
      </ImageBackground>
    );
  }
  _login = async () => {
    if (userInfo.username === this.state.username && userInfo.password === this.state.password) {
      // alert('Logged In');
      this.props.navigation.navigate('Homepage')
    } else {
      alert('Username or Password is incorrect.')
    }
  }
}


class homepage extends React.Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }
  renderItem = ({item}) => {
    return (
      <ImageBackground source={require('./background1.jpg')} style={styles.container}>
       {/* <Text onPress={() => this.props.navigation.navigate('BasicFlatList')}
        >ANOTHER PAGE</Text>  */}
      <Button
            title='Detail'
          onPress={() => this.props.navigation.navigate('Detail')}
        > ANOTHER PAGE</Button> 

      <View style = {{flex:1,flexDirection:'row',marginBottom:3}}>
        <Image style={{width:100,height:100, margin:5}}
        source={{ uri: item.image}} />
      <View style = {{ flex:1,justifyContent:'center',}}>
        <Text style={{ marginBottom:15}}>
          {item.book_title}
        </Text>
       
        <Text> 
          {item.author}
        </Text>
        </View>
      </View>
      </ImageBackground>
    )
  }
  componentDidMount() {
    const url = 'http://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1'

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.book_array
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
render(){
  return(
    <View style={styles.container2}>
    <FlatList
    data={this.state.dataSource}
    renderItem={this.renderItem}
 />
 </View>
  );
}}
 
 class  detail extends React.Component {

  render() {
    return (
      <View >

  
      <FlatList
      data={[
      {key: <Image source={require( './image1.jpg')} style={{width: 200, height: 200}} />}, 
      {key: <Image source={require( './image2.jpg')} style={{width: 200, height: 200}} />},
      {key: <Image source={require( './image1.jpg')} style={{width: 200, height: 200}} />},
      {key: <Image source={require( './image1.jpg')} style={{width: 200, height: 200}} />},
      {key: <Image source={require( './image1.jpg')} style={{width: 200, height: 200}} />},
      {key: <Image source={require( './image1.jpg')} style={{width: 200, height: 200}} />},
    ]}

      renderItem={({item}) => <Text>{item.key}</Text>}
    />
      </View>
    
    )

  }}
  
//   <FlatList 
//   data={[{title: ‘Title Text’, key: ‘item1’}, …]} 
//   renderItem={({item}) => <ListItem title={item.title} />} 
// /></View>


// class FlatListItem extends React.Component {
  
//   render() {
//     return (
//         <View style ={{
//             flex:1,
//             backgroundColor:this.props.index % 2==0 ? 'mediumseagreen' : 'tomato'
//         }} >
//           <Text>{this.props.item.name}</Text>
//           <Text>{this.props.item.foodDescription}</Text>
//         </View>

//     );
  
// }}

// export default class BasicFlatList extends React.Component {
  
//   render() {
//     return (
//         <View style ={{flex:1,marginTop:22}} >
//             <FlatList
//                 data={flatListData}
//                 renderItem={({item,index})=> {
//                   return(<FlatListItem item = {item} index = {index}>
                  
                  
//                   </FlatListItem>);
//                 }}
//                 >

//             </FlatList>
//         </View>

//     );
  
// }}

const AppStackNavigator = createStackNavigator({
  Home: login,
  Register: register,
  Homepage: homepage,
  Detail: detail,
  // BasicFlatList: basicFlatList

}, {
  
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'white'
      }
    }
  });

  

const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',


  },

  text: {
    alignItems: 'center',
    fontSize: 20,
    color: 'black',

  },

  image: {
    alignItems: 'center',
    width: '100%',
    resizeMode: 'contain',
  },

  text2: {
    alignItems: 'center',
    fontSize: 15,
    color: 'black',

  },

  logo: {
    alignItems: 'center',
    width: '100%',
    height: '50%',
    resizeMode: 'center',
  },
  container2: {
    flex: 1,
  


  },



});
