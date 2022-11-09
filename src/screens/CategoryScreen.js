import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Categories} from '../constants/categories';
import CategoryListItem from '../components/categoryListItem';
import { HeaderBackButton } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign'

function CategoryScreen({navigation}) {
  const [transactions, setTransactions] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Expense Tracker',
      headerLeft: () => (
       <AntDesign
        name='arrowleft'
         color={'black'}
          size={24}
          style={{marginLeft:15}}
           onPress={()=>{
        setCategories(null) 
        setFilterTransaction(null) 
        setTransactions(null) 
        navigation.replace('Home')
       }} />
      ),
    })
  }, [navigation])

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('expense')
      .onSnapshot(snapshot => {
        setTransactions(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
    return unsubscribe;
  }, []);
  const [filteredTransaction, setFilterTransaction] = useState([]);
  const [categories, setCategories] = useState([...Categories]);

  useEffect(() => {
    if (transactions) {
      setFilterTransaction(
        transactions?.filter(
          //filtering the transaction of current user
          transaction => transaction.data.email === auth().currentUser.email,
        ),
      );
    }
  }, [transactions]);

  useEffect(() => {
    if (filteredTransaction) {
      let copyOfCategories = [...categories];

      copyOfCategories?.map((catItem, catIndex) => {
        filteredTransaction?.map((transItem, transIndex) => {
          if (transItem.data.category === catItem.name) {
            copyOfCategories[catIndex].totalAmount = copyOfCategories[catIndex]
              .totalAmount
              ? copyOfCategories[catIndex].totalAmount + transItem.data.price
              : transItem.data.price;
            copyOfCategories[catIndex].totalTransactions = copyOfCategories[
              catIndex
            ].totalTransactions
              ? copyOfCategories[catIndex].totalTransactions + 1
              : 1;
          }
          console.log('copy', categories);
        });
      });

      setCategories(copyOfCategories);
    }
  }, [filteredTransaction]);

  return (
    <View style={{flex: 1}}>
      {categories?.map(item => {
        return <CategoryListItem data={item} />;
      })}
    </View>
  );
}

export default CategoryScreen;
