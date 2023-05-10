/* eslint-disable curly */
/* eslint-disable no-alert */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';
let db = openDatabase({name: 'UserDatabase.db'});

const AddUser = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [salaire, setSalaire] = useState('');

  const checkTextInput = () => {
    //si nom vide
    if (!name.trim()) {
      alert('Veuillez entrer le nom!');
      return;
    } else if (!email.trim()) {
      alert("Veuillez entrer l'adresse mail!");
      return;
    } else if (!address.trim()) {
      alert("Veuillez entrer l'adresse!");
      return;
    } else if (!salaire.trim()) {
      alert('Veuillez entrer la salaire!');
      return;
    } else {
      saveUser();
    }
  };

  const onChangeTextSalaire = txt => {
    // Validate the input
    const newSalaire = txt.replace(/[^0-9]/g, '');
    setSalaire(newSalaire);
  };

  const saveUser = () => {
    const parsedSalaire = parseInt(salaire, 10);
    console.log(name, email, address, parsedSalaire);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (name, email, address,salaire) VALUES (?,?,?,?)',
        [name, email, address, parsedSalaire],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Information',
              'Information ajouté avec succès',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert("Erreur de l'enregistrement");
        },
        error => {
          console.log(error);
        },
      );
    });
  };
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), address VARCHAR(100), salaire INTEGER)',
              [],
            );
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.itemTitre}>{'Ajouter nouveau employé'}</Text>
      <TextInput
        placeholder="Nom"
        style={styles.input}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={[styles.input, {marginTop: 20}]}
      />
      <TextInput
        placeholder="Adresse"
        value={address}
        onChangeText={txt => setAddress(txt)}
        style={[styles.input, {marginTop: 20}]}
      />
      <TextInput
        placeholder="Salaire"
        value={salaire}
        onChangeText={onChangeTextSalaire}
        keyboardType="numeric"
        style={[styles.input, {marginTop: 20}]}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          checkTextInput();
        }}>
        <Text style={styles.btnText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: 'center',
    paddingLeft: 20,
    marginTop: 10,
  },
  addBtn: {
    backgroundColor: 'purple',
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  itemTitre: {
    backgroundColor: 'purple',
    width: '100%',
    color: '#fff',
    height: 40,
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
});
