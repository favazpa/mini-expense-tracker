import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ListItem, Text, Divider} from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


// import ModalActions from './ModalActions'

const CategoryListItem = ({data, navigation}) => {
    // const [modalVisible, setModalVisible] = useState(false)

    const color = data?.color

    return (
      <>
        <View>
          <ListItem >
              <View style={[styles.income,{backgroundColor: color} ]}>
                <MaterialCommunityIcons name={data.iconName} size={24} color='white' />
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
                  {'\u20B9'} -{Number(data?.totalAmount)?.toFixed(2)}
                </Text>
              ) : (
                <Text style={styles.rightIncome}>
                  {'\u20B9'} {Number(data?.totalAmount)?.toFixed(2)}
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
