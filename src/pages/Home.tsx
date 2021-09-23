import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const verifyTask = tasks.find(item => item.title === newTaskTitle)

    if(verifyTask) return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldState =>[...oldState, task])
    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({...task}));
    const foundItem = updatedTask.find(item => item.id === id)
    if(!foundItem) return;
    foundItem.done = !foundItem.done
    setTasks( updatedTask )
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item', 
      'Tem certeza que você deseja remover esse item?',
      [
        {text: 'sim', onPress: () => setTasks(oldState => [ ...oldState.filter(item => item.id !== id)])}, 
        {text: 'não'}
      ])
    //TODO - remove task from state
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTask = tasks.map(task => ({...task}));
    const foundItem = updatedTask.find(item => item.id === taskId)
    if(!foundItem) return;
    foundItem.title = taskNewTitle
    setTasks( updatedTask )
    // TODO - Rename task title from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})