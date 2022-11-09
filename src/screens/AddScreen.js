import {StatusBar} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, TextInput} from 'react-native';
import {Text, Button} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import format from 'date-fns/format';
import {Picker} from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
// import firebase from 'firebase'
import firestore from '@react-native-firebase/firestore';
import {Categories} from '../constants/categories';
import {loadPartialConfigAsync} from '@babel/core';

const AddScreen = ({navigation}) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Expense',
    });
  }, [navigation]);
  const [input, setInput] = useState('');
  const [amount, setAmount] = useState('');
  const createExpense = () => {
    if (input && amount && selDate && selectedLanguage && auth()) {
      setSubmitLoading(true);
      firestore()
        .collection('expense')
        .add({
          email: auth().currentUser.email,
          text: input,
          price: Number(amount),
          date: selDate,
          type: selectedLanguage,
          category: selectedCategory,
          userDate: result,
        })
        .then(() =>
          //         {
          //  const document = firestore()
          // .collection("Categories")
          // .where("userId","==",auth().currentUser?.uid)
          // .where("name","==",selectedCategory)
          // .get();
          // if (document && document.exists) {
          //    document.update({
          //     totalAmount: firestore.FieldValue.increment(amount),
          //     totalTransactions: firestore.FieldValue.increment(1)
          //   });
          // }
          // else {
          //    document.set({
          //     name: selectedCategory,
          //     totalAmount: amount,
          //     totalTransactions: 1,
          //     userId: auth().currentUser?.uid
          //   }, { merge: true });
          // }
          //         }

          firestore()
            .collection('Categories')
            .where('userId', '==', auth().currentUser?.uid)
            .where('name', '==', selectedCategory)
            .update({
              totalAmount: firestore.FieldValue.increment(Number(amount)),
              totalTransactions: firestore.FieldValue.increment(1),
            })
            .then(() => clearInputFields())
            .catch(error => {
              firestore()
                .collection('Categories')
                .add({
                  name: selectedCategory,
                  totalAmount: amount,
                  totalTransactions: 1,
                  userId: auth().currentUser?.uid,
                })
                .then(() => clearInputFields())
                .catch(error => alert(error.message));
            }),
        )
        .catch(error => {
          alert(error.message);
        });
    } else {
      alert('All fields are mandatory');
      setSubmitLoading(false);
    }
  };

  const clearInputFields = () => {
    alert('Created Successfully');
    setInput('');
    setAmount('');
    setSelDate(new Date());
    setSelectedLanguage('expense');
    navigation.navigate('Home');
    setSubmitLoading(false);
  };
  // Date Picker
  const [selDate, setSelDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setSelDate(currentDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const result = format(selDate, 'dd/MM/yyyy');

  // Select Dropdown
  const [selectedLanguage, setSelectedLanguage] = useState('expense');
  const [selectedCategory, setSelectedCategory] = useState('Food');

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Text"
          value={input}
          onChangeText={text => setInput(text)}
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Add Amount"
          value={amount}
          onChangeText={text => setAmount(text)}
        />

        <Text
          style={styles.input}
          placeholder="Select Date"
          value={result}
          onPress={showDatepicker}
          // editable={false}
        >
          {result ? result : new Date()}
        </Text>

        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }>
          {Categories.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.name} value={item.name} />
            );
          })}
        </Picker>

        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Expense" value="expense" />
          <Picker.Item label="Income" value="income" />
        </Picker>

        <Button
          containerStyle={styles.button}
          title="Add"
          onPress={createExpense}
          loading={submitLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
});