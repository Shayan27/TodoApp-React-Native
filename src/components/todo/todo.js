import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity} from 'react-native';
import { capitalize } from '../../utils/helper';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import firebaseApp from '../firebase/fire'

export default class Todo extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { todos: [] }; // <- set up react state
  }
  
  componentWillMount(){
    /* Create reference to todos in Firebase Database */
    let todosRef = fire.database().ref('todos').orderByKey().limitToLast(100);
    todosRef.on('child_added', snapshot => {
      /* Update React state when todo is added at Firebase Database */
      let todo = { text: snapshot.val(), id: snapshot.key };
      this.setState({ todos: [todo].concat(this.state.todos) });
    })
  }
  addtodo(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the todo to Firebase */
    fire.database().ref('todos').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  
  render() {
    return (
      <ScrollView style={styleTodo.todoMain} contentContainerStyle={styleTodo.todoContainer}>
        <TextInput
          style={styleTodo.textInput}
          placeholder="My Todo"
          ref={ el => this.inputEl = el }
        />
        <TouchableOpacity style={styleTodo.addBtn} onPress={this.addtodo.bind(this)}>
            <Text style={styleTodo.addBtnText}>
                Add
            </Text>
          </TouchableOpacity>
        {
            this.state.todos.map( todo => <Text key={todo.id} >{todo.text}</Text> )
        }
      </ScrollView>
    );
  }
}



const styleTodo = StyleSheet.create({
  todoMain: {
    flex: 1,
  },
  todoContainer: {
    alignItems: 'center',
  },
  textInput: {
     height: 40,
     paddingLeft: 3,
     width: '80%',
     alignItems: 'center',
     marginTop: 30,
     fontSize: 15,
     marginBottom: 10,
  },
  todoAdd: {
    width: 80,
  },
  addBtn: {
    backgroundColor: '#333',
    paddingBottom: 6,
    paddingTop: 6,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  addBtnText: {
    fontSize: 14,
    color: '#fff',
  },
  item: {
      borderBottomWidth: 1,
      borderBottomColor: '#365899',
      paddingTop: 5,
      marginBottom: 5,
      paddingBottom: 1,
  },
});
