import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ListItem, Text, Divider} from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// import ModalActions from './ModalActions'

const CategoryListItem = ({data, navigation}) => {
    // const [modalVisible, setModalVisible] = useState(false)

    return (
      <>
        <View>
          <ListItem onPress={() => setModalVisible(true)}>
              <View style={styles.income}>
                <MaterialIcons name='attach-money' size={24} color='white' />
              </View>
            <ListItem.Content>
              <ListItem.Title
                style={{fontWeight: 'bold', textTransform: 'capitalize'}}
              >
                {data?.name}
              </ListItem.Title>
              <ListItem.Subtitle>
                {/* {new Date(info?.timestamp?.toDate()).toUTCString()} */}
                {data?.totalTransactions} transactions
              </ListItem.Subtitle>
            </ListItem.Content>
            <View>
              {data.totalAmount < 0 ? (
                <Text style={styles.right}>
                  $ -{Number(data?.totalAmount)?.toFixed(2)}
                </Text>
              ) : (
                <Text style={styles.rightIncome}>
                  $ {Number(data?.totalAmount)?.toFixed(2)}
                </Text>
              )}
            </View>
          </ListItem>
          <Divider style={{backgroundColor: 'lightgrey'}} />
        </View>
        {/* <ModalActions
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
          id={id}
        /> */}
      </>
    )
  }
  
  export default CategoryListItem
  
  const styles = StyleSheet.create({
    left: {
      backgroundColor: '#533461',
      borderRadius: 8,
      padding: 10,
    },
  
    income: {
      backgroundColor: '#61ACB8',
      borderRadius: 8,
      padding: 10,
    },
    right: {
      fontWeight: 'bold',
      color: 'red',
    },
    rightIncome: {
      fontWeight: 'bold',
      color: 'green',
    },
  })
