import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'UserDatabase.db'});
const Home = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setUserList(temp);
      });
    });
    min();
    max();
    total();
  };

  let deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Information',
              'Suppression réussie',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    getData();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Echec de la suppression!');
          }
        },
      );
    });
  };

  const min = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT MIN(salaire) as min_salary FROM table_user',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            setMinSalary(results.rows.item(0).min_salary);
          }
        },
      );
    });
  };

  const max = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT MAX(salaire) as max_salary FROM table_user',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            setMaxSalary(results.rows.item(0).max_salary);
          }
        },
      );
    });
  };

  const total = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT SUM(salaire) as total_salary FROM table_user',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            setTotalSalary(results.rows.item(0).total_salary);
          }
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.itemTitre}>{'Liste des employés'}</Text>
      <FlatList
        data={userList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.userItem}>
              <Text style={styles.itemText}>{'Nom: ' + item.name}</Text>
              <Text style={styles.itemText}>{'Email: ' + item.email}</Text>
              <Text style={styles.itemText}>{'Addresse: ' + item.address}</Text>
              <Text style={styles.itemText}>{'Salaire: ' + item.salaire}</Text>
              <View style={styles.belowView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditUser', {
                      data: {
                        name: item.name,
                        email: item.email,
                        address: item.address,
                        salaire: item.salaire,
                        id: item.user_id,
                      },
                    });
                  }}>
                  <Image
                    source={require('../images/edit.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Attention',
                      'Supprimer?',
                      [
                        {
                          text: 'Oui',
                          onPress: () => {
                            deleteUser(item.user_id);
                          },
                        },
                        {
                          text: 'Non',
                          onPress: () => {
                            getData();
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.footer}>
        <View style={styles.square}>
          <Text style={styles.itemText}>Tot:{totalSalary}</Text>
        </View>
        <View style={styles.square}>
          <Text style={styles.itemText}>Max:{maxSalary}</Text>
        </View>
        <View style={styles.square}>
          <Text style={styles.itemText}>Min:{minSalary}</Text>
        </View>
        <TouchableOpacity
          style={styles.addNewBtn}
          onPress={() => {
            navigation.navigate('AddUser');
          }}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'purple',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: 'purple',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
  },
  square: {
    backgroundColor: '#f2f2f2',
    width: 105,
    height: 30,
    margin: 6,
  },
  container: {
    flex: 1,
  },
  addNewBtn: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    right: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 18,
  },
  userItem: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  itemTitre: {
    backgroundColor: 'purple',
    width: '100%',
    color: '#fff',
    height: 45,
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  belowView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    height: 40,
  },
  icons: {
    width: 24,
    height: 24,
  },
});
