import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable, Modal,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../aws-exports';
import { deleteRecipe, updateRecipe } from '../graphql/mutations';

Amplify.configure(config);

const RecipeTile = (item) => {
  const { recipe } = item;
  const { navigation } = item;
  const initialState = { title: recipe.title, description: recipe.description, price: String(recipe.price) };
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState(initialState);

  async function deleteRecipeById() {
    try {
      await API.graphql(graphqlOperation(deleteRecipe, { input: { id: recipe.id } }));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  async function updateRecipeById() {
    try {
      await API.graphql(graphqlOperation(updateRecipe, {
        input: {
          id: recipe.id, title: formState.title, description: formState.description, price: Number(formState.price),
        },
      }));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const renderEditButton = (edit) => {
    if (!edit) {
      return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { setModalVisible(true); setEditing(true); }}>
          <Text style={{ fontSize: 17 }}>Edit</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setEditing(false);
          }}
        >
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
          >
            <View style={styles.modalView}>
              <View style={styles.closeContainer}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => { setModalVisible(!modalVisible); setEditing(false); }}
                >
                  <FontAwesomeIcon icon={faTimes} size={29} color="white" />
                </Pressable>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(val) => setInput('title', val)}
                  style={styles.input}
                  value={formState.title}
                  placeholder="Title"
                />

              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(val) => setInput('description', val)}
                  style={styles.input}
                  value={formState.description}
                  placeholder="Description"
                />

              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(val) => setInput('price', val)}
                  style={styles.input}
                  value={formState.price}
                  placeholder="Price: Number Value"
                />
              </View>
              <Pressable style={styles.logoutButtonContainer} onPress={() => { setModalVisible(!modalVisible); setEditing(false); updateRecipeById(); }}>
                <Text style={{ fontSize: 16 }}>Done</Text>
              </Pressable>

            </View>
          </KeyboardAwareScrollView>
        </Modal>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ maxWidth: '75%', fontSize: 18 }} numberOfLines={1}>
          {recipe.title}
        </Text>
        <Text style={{ fontSize: 18 }} numberOfLines={1}>
          Cost:
          {' '}
          {recipe.price}
        </Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {recipe.description}
      </Text>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={deleteRecipeById}>
          <Text style={{ fontSize: 17 }}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigation.navigate('RecipeDetail', { recipe })}>
          <Text style={{ fontSize: 17 }}>Expand</Text>
        </TouchableOpacity>
        {renderEditButton(editing)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40, backgroundColor: 'white', marginBottom: 10, padding: 8, borderRadius: 15,
  },
  description: {
    paddingHorizontal: 25,
    paddingBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: 'rgba(175,175,175,0.6)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 'auto',
    width: '28%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logoutButtonContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    height: 'auto',
    width: 'auto',
  },
  container: {
    flex: 1,
    backgroundColor: '#5ecc7f',
    borderRadius: 10,
    flexDirection: 'column',
    width: '92%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 25,
  },
  inputContainer: {
    marginVertical: 10,
    width: '100%',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeContainer: {
    flex: 1,
    position: 'absolute',
    right: '5%',
    top: '3%',
  },
  modalView: {
    borderRadius: 20,
    backgroundColor: 'gray',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: '10%',
    paddingVertical: '8%',
  },
});

export default RecipeTile;
