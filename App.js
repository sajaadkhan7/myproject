import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import { saveTodoListToStorage, loadTodoListFromStorage } from './todoHelper';

export default function App() {
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: '1' },
    { text: "create an app", key: '2' },
    { text: "play on the switch", key: '3' },
  ]);




  const ref = useRef();
  useEffect(() => {
    const loadTodos = async () => {
      const loadedTodos = await loadTodoListFromStorage();
      setTodos(loadedTodos);
    };
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodoListToStorage(todos);
    const loadTodos = async () => {
      const loadedTodos = await loadTodoListFromStorage();
      console.log("Loaded todos: ", loadedTodos)
    }
    loadTodos();
  }, [todos]);

  const pressHandler = (key) => {
    setTodos((prev) => {
      return prev.filter(todo => todo.key != key);
    })
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prev) => {
        return [
          ...prev,
          { text: text, key: Math.random().toString() }
        ];
      });
      ref.current.changeHandler("");
    } else {
      Alert.alert("OOPS!", 'Todos must be over 3 chars long', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ])
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        { /* Header */}
        <Header />
        <View style={styles.content}>
          {/* to form */}
          <AddTodo submitHandler={submitHandler} ref={ref} />
          <View style={styles.list}>
            <FlatList showsVerticalScrollIndicator={false} data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} handler={pressHandler} />
              )} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1
  }
});
