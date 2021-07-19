import Amplify, { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity, Text, View, Modal, Pressable,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import config from '../aws-exports';
import RecipeTile from '../components/RecipeTile';
import { createRecipe } from '../graphql/mutations';
import { listRecipes } from '../graphql/queries';
import { onDeleteRecipe, onUpdateRecipe } from '../graphql/subscriptions';

Amplify.configure(config);

const initialState = { title: '', description: '', price: '' };

const RecipeDetailScreen = (props) => {
  const [formState, setFormState] = useState(initialState);
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const subscriptionRef = useRef();

  const renderItem = ({ item }) => {
    return <RecipeTile navigation={props} recipe={item} />;
  };

  async function fetchRecipes() {
    try {
      const recipeData = await API.graphql(graphqlOperation(listRecipes));
      const fetchedrecipes = recipeData.data.listRecipes.items;
      setRecipes(fetchedrecipes);
    } catch (err) { console.log(err); }
  }

  async function addRecipe() {
    try {
      const recipe = { title: formState.title, description: formState.description, price: Number(formState.price) };
      setFormState(initialState);
      await API.graphql(graphqlOperation(createRecipe, { input: recipe }));
      await fetchRecipes();
    } catch (err) {
      console.log('error creating recipe:', err);
    }
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const renderEditButton = (edit) => {
    if (!edit) {
      return (
        <TouchableOpacity style={styles.addButtonContainer} onPress={() => { setModalVisible(true); setEditing(true); }}>
          <Text style={{ fontSize: 17, color: 'lightgray' }}>Add Recipe</Text>
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
              <Pressable style={styles.logoutButtonContainer} onPress={() => { setModalVisible(!modalVisible); setEditing(false); addRecipe(); }}>
                <Text style={{ fontSize: 16 }}>Done</Text>
              </Pressable>

            </View>
          </KeyboardAwareScrollView>
        </Modal>
      );
    }
  };

  useEffect(() => {
    fetchRecipes();

    subscriptionRef.current = API.graphql(
      graphqlOperation(onDeleteRecipe),
    ).subscribe({
      next: (newData) => {
        fetchRecipes();
      },
    });

    subscriptionRef.current = API.graphql(
      graphqlOperation(onUpdateRecipe),
    ).subscribe({
      next: (newData) => {
        fetchRecipes();
      },
    });
  }, []);

  return (

    <SafeAreaView>
      {renderEditButton(editing)}
      <FlatList
        data={recipes}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 40 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40, backgroundColor: 'white', marginBottom: 10, padding: 8, borderRadius: 15,
  },
  todoName: { fontSize: 18 },
  logoutButtonContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    height: 'auto',
    width: 'auto',
  },
  addButtonContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 20,
    height: 'auto',
    width: '30%',
    alignItems: 'center',
    alignSelf: 'center',
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

export default RecipeDetailScreen;
