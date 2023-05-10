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
import {useNavigation, useRoute} from '@react-navigation/native';
let db = openDatabase({name: 'UserDatabase.db'});
const EditUser = () => {
  const route = useRoute();
  console.log(route.params.data);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(route.params.data.email);
  const [address, setAddress] = useState(route.params.data.address);
  const [salaire, setSalaire] = useState(route.params.data.salaire);

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
    } else if (!salaire) {
      alert("Veuillez entrer l'adresse!");
      return;
    } else {
      updateUser();
    }
  };
  const onChangeTextSalaire = txt => {
    // Validate the input
    const newSalaire = txt.replace(/[^0-9]/g, '');
    setSalaire(newSalaire);
  };

  const updateUser = () => {
    const parsedSalaire = parseInt(salaire, 10);
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set name=?, email=? , address=?, salaire=? where user_id=?',
        [name, email, address, parsedSalaire, route.params.data.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Information',
              'Modification terminés!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Erreur de la modification!');
        },
      );
    });
  };
  useEffect(() => {
    const conv = route.params.data.salaire;
    setName(route.params.data.name);
    setEmail(route.params.data.email);
    setAddress(route.params.data.address);
    setSalaire(conv.toString());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.itemTitre}>{'Modification'}</Text>
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
        placeholder="Addresse"
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
        <Text style={styles.btnText}>Modifier</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUser;
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
    height: 50,
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
