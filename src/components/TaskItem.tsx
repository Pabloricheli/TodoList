import React, { useEffect, useState, useRef } from 'react';

import {View, TouchableOpacity, Image, StyleSheet,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface TaskItemPros {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title:string)  => void;
}

export function TaskItem({task,toggleTaskDone,removeTask,editTask}:TaskItemPros) {

  const [isEditTask, setIsEditedTask] = useState(false)
  const [itemTitle, setItemTitle] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditedTask(true)
    
  }

  function handleCancelEditing() {
    setIsEditedTask(false)
    setItemTitle(task.title)
  }

  function handleSubmitEditing(id: number, title: string) {
    editTask(id,title)
    setIsEditedTask(false)
  }
  
  useEffect(()=>{
    if (textInputRef.current) {
      if (isEditTask) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  },[isEditTask])

  return (   
    <> 
      <View>
        <TouchableOpacity
          testID={`button-${task}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          //TODO - use onPress (toggle task) prop
        >
        <View 
          testID={`marker-${task}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          //TODO - use style prop 
        >
          { task.done && (
            <Icon 
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput 
        value={itemTitle}
        onChangeText={setItemTitle}
        editable={isEditTask}
        onSubmitEditing={()=>handleSubmitEditing}
        ref={textInputRef}
        style={task.done ? styles.taskTextDone : styles.taskText}
          //TODO - use style prop
        />
      </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row'}}>
      {isEditTask 
        ? <TouchableOpacity
          testID={`remove-${task}`}
          style={{ paddingHorizontal: 20 }}
          onPress={handleCancelEditing}
          //TODO - use onPress (remove task) prop
        >
           <Icon 
              name="x"
              size={24}
              color="#666"
            />
        </TouchableOpacity>

        : <TouchableOpacity
          testID={`edit-${task}`}
          style={{ paddingHorizontal: 20 }}
          onPress={handleStartEditing}
          //TODO - use onPress (remove task) prop
        >
           <Icon 
              name="edit"
              size={18}
              color="#666"
            />
          
        </TouchableOpacity>}

        <View style={styles.divider}/>

        <TouchableOpacity
          testID={`trash-${task}`}
          disabled={isEditTask}
          style={{ paddingHorizontal: 20 }}
          onPress={() => removeTask(task.id)}
          //TODO - use onPress (remove task) prop
        >
          <Image source={trashIcon} style={{opacity: isEditTask? 0.2 : 1}}/>
        </TouchableOpacity>
        
        
    </View>
    
  </>
  )
}

const styles = StyleSheet.create({
  divider: {
    width:1, 
    height:24,
    backgroundColor:'rgba(196, 196, 196, 0.24)'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})