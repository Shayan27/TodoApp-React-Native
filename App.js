import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  ToolbarAndroid
} from 'react-native';
import * as firebase from 'firebase';
import ListItem from './src/components/ListItem/ListItem';
import styles from './styles'
import FloatingActionButton from 'react-native-action-button';
import { Header, Item, Input, Label } from 'native-base';

// Initialize Firebase (unused for now)
var config = {
  apiKey: "AIzaSyDdbWcodrG73QbpzW-ao3MPrQyCj5B2Tvw",
  authDomain: "todoapp-26777.firebaseapp.com",
  databaseURL: "https://todoapp-26777.firebaseio.com",
  projectId: "todoapp-26777",
  storageBucket: "todoapp-26777.appspot.com",
  messagingSenderId: "390125381199"
};
const firebaseApp = firebase.initializeApp(config);

export default class App extends React.Component {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  constructor(props) {
    super(props);
    this.tasksRef = firebaseApp.database().ref();
    // Each list must has a dataSource, to set that data for it you must call: cloneWithRows()
    // Check out the docs on the React Native List View here:
    // https://facebook.github.io/react-native/docs/listview.html
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource, // dataSource for our list
      newTask: "" // The name of the new task
    };
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);

    console.ignoredYellowBox = ['Setting a timer'];
  }

  render() {
    return (
      <View style={styles.container}>
  			<ToolbarAndroid
          style={styles.navbar}
          title="Todo List" />
        {/*A list view with our dataSource and a method to render each row*/}
        {/*Allows lists to be empty, can be removed in future versions of react*/}
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this._renderItem.bind(this)}
          style={styles.listView}/>
        {/* <TextInput
           value={this.state.newTask}
           style={styles.textEdit}
           onChangeText={(text) => this.setState({newTask: text})}
           placeholder="New Task"
         /> */}
         <Item floatingLabel>
              <Label>New Task</Label>
              <Input
              value={this.state.newTask}
              style={styles.textEdit}
              onChangeText={(text) => this.setState({newTask: text})}
              />
        </Item>
        {/*The library has a bug so I removing the shadow to avoid it*/}
        <FloatingActionButton
          hideShadow={true}
          buttonColor="rgba(231,76,60,1)"
          onPress={this._addTask.bind(this)}/>
      </View>
    );
  }

  _renderItem(task) {
    // a method for building each list item
    const onTaskCompletion = () => {
      // removes the item from the list
      this.tasksRef.child(task._key).remove()
    };
    return (
      <ListItem task={task} onTaskCompletion={onTaskCompletion} />
    );
  }

  _addTask() {
    if (this.state.newTask === "") {
      return;
    }
    this.tasksRef.push({ name: this.state.newTask});
    this.setState({newTask: ""});
  }

  listenForTasks(tasksRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase
    tasksRef.on('value', (dataSnapshot) => {
      // transform the children to an array
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          name: child.val().name,
          _key: child.key
        });
      });

      // Update the state with the new tasks
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
    });
  }
}