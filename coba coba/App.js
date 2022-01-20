import React, { useState } from 'react';
import { Keyboard, Modal, ScrollView, StyleSheet, SafeAreaView, Dimensions, TextInput, Text, View, Button } from 'react-native';
import TaskInputField from './components/TaskInputField';
import TaskItem from './components/TaskItem';

const { width } = Dimensions.get("window");

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [indexUpdate, setIndexUpdate] = useState(0);

  const addTask = (task) => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
  }
  const editTask = (editIndex) => {
    setModalVisible(true);

    setInputValue(tasks[editIndex])
    setIndexUpdate(editIndex)
  }
  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  }

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const updateTask = () => {
    if (indexUpdate != 0) {

      setTasks(tasks.map((value, index) =>
        index == indexUpdate ? inputValue : value
      ))
      setIndexUpdate(0)
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TODO LIST</Text>
      <ScrollView style={styles.scrollView}>
        {
          tasks.map((task, index) => {
            return (
              <View key={index} style={styles.taskContainer}>
                <TaskItem index={index + 1} task={task} deleteTask={() => deleteTask(index)} editTask={() => editTask(index)} />
              </View>
            );
          })
        }
      </ScrollView>
      <TaskInputField addTask={addTask} />
      <Modal animationType="slide"
        transparent visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <TextInput placeholder="Enter something..."
              value={inputValue} style={styles.textInput}
              onChangeText={(value) => setInputValue(value)} />

            {/** This button is responsible to close the modal */}
            <Button title="Update" onPress={updateTask} />
            <Button title="Close" onPress={toggleModalVisibility} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
    { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#3E3364",
    borderRadius: 7,
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 3,
    marginBottom: 8,
  },
});