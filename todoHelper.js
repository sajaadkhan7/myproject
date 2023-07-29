
import AsyncStorage from '@react-native-async-storage/async-storage';
// Function to save the todo list data to local storage
export const saveTodoListToStorage = async (todos) => {
    try {
        const jsonTodos = JSON.stringify(todos);
        await AsyncStorage.setItem('todoList', jsonTodos);
    } catch (error) {
        console.log('Error saving todo list:', error);
    }
};

// Function to load the todo list data from local storage
export const loadTodoListFromStorage = async () => {
    try {
        const jsonTodos = await AsyncStorage.getItem('todoList');
        if (jsonTodos !== null) {
            const todos = JSON.parse(jsonTodos);
            return todos;
        } else {
            return [];
        }
    } catch (error) {
        console.log('Error loading todo list:', error);
        return [];
    }
};
