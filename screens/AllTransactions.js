import React, {useEffect, useLayoutEffect, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import auth from '@react-native-firebase/auth';
import {Text} from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import firestore from '@react-native-firebase/firestore';

const AllTransactions = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Transactions',
    })
  }, [])
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('expense')
      .orderBy('date','desc')
      .onSnapshot((snapshot) =>{
        setTransactions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )}
      )

    return unsubscribe
  }, [])
  const [filter, setFilter] = useState([])
  useEffect(() => {
    if (transactions) {
      setFilter(
        transactions.filter(
          (transaction) => transaction.data.email === auth().currentUser.email
        )
      )
    }
  }, [transactions])
  return (
    <>
      {filter?.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <ScrollView >
            {filter?.map((info) => (
              <View key={info.id}>
                <CustomListItem
                  info={info.data}
                  navigation={navigation}
                  id={info.id}
                />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.containerNull}>
          <FontAwesome5 name='list-alt' size={24} color='#EF8A76' />
          <Text h4 style={{color: '#4A2D5D'}}>
            No Transactions
          </Text>
        </View>
      )}
    </>
  )
}

export default AllTransactions

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex:1
  },
  containerNull: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
