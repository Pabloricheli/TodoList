import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

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
    setTasks(oldState => [ ...oldState.filter(item => item.id !== id)])
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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