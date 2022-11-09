// import { StatusBar } from 'react-native'

// import React, {useLayoutEffect, useState} from 'react'
// import {StyleSheet, View, KeyboardAvoidingView} from 'react-native'
// import {Input, Button, Text, Image} from 'react-native-elements'
// import auth from '@react-native-firebase/auth';

// const RegisterScreen = ({navigation}) => {
//   const [fullName, setFullName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [imageUrl, setImageUrl] = useState('')
//   const [submitLoading, setSubmitLoading] = useState(false)

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerBackTitle: 'Back to Login',
//     })
//   }, [navigation])

//   const signUp = () => {
//     if (fullName && email && password) {
//       setSubmitLoading(true)
//       auth()
//         .createUserWithEmailAndPassword(email, password)
//         .then((authUser) => {
//           clearInputFields() &
//             authUser.user.updateProfile({
//               displayName: fullName,
//               photoURL:
//                 imageUrl ||
//                 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
//             })
//         })
//         .catch((err) => alert(err.message) & setSubmitLoading(false))
//     } else {
//       alert('All fields are mandatory')
//       setSubmitLoading(false)
//     }
//   }
//   const clearInputFields = () => {
//     alert('Successfully Created Account')
//     navigation.replace('Home')
//     setSubmitLoading(false)
//     setFullName('')
//     setEmail('')
//     setPassword('')
//     setImageUrl('')
//   }
//   return (
//     <KeyboardAvoidingView behavior='padding' style={styles.container}>
//       <StatusBar style='light' />
//       <Image
//         source={{
//           uri:
//             'https://static-s.aa-cdn.net/img/gp/20600011886807/to-aGJ31KLwqc9AWaBUyL6NLbpFwN9VEliX7nQ_AU48aO4jH6M1MltWKmThWJPndJg=s300?v=1',
//         }}
//         style={{width: 100, height: 100, marginBottom: 20}}
//       />
//       <Text h4 style={{marginBottom: 50}}>
//         Create an account
//       </Text>
//       <View style={styles.inputContainer}>
//         <Input
//           placeholder='Full Name'
//           type='text'
//           autoFocus
//           value={fullName}
//           onChangeText={(text) => setFullName(text)}
//         />
//         <Input
//           placeholder='Email'
//           type='text'
          
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <Input
//           placeholder='Password'
//           type='text'
          
//           value={password}
//           secureTextEntry
//           onChangeText={(text) => setPassword(text)}
//         />
//         <Input
//           placeholder='Profile Picture Url (Optional)'
//           type='text'
         
//           value={imageUrl}
//           onChangeText={(text) => setImageUrl(text)}
//           onSubmitEditing={signUp}
//         />
//       </View>
//       <Button
//         containerStyle={styles.button}
//         title='Register'
//         onPress={signUp}
//         loading={submitLoading}
//       />
//     </KeyboardAvoidingView>
//   )
// }

// export default RegisterScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//   },
//   inputContainer: {
//     width: 300,
//   },
//   button: {
//     width: 300,
//     marginTop: 10,
//   },
// })



import React, {useState, createRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Button,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const [animating,setAnimating]= useState(false)

  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const designationInputRef = createRef();
  const departmentInputRef = createRef();

  const usersCollection = firestore().collection('Users');





  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) return alert('Please fill Name');
    if (!email) return alert('Please fill Email');
    if (!userPassword) return alert('Please fill Address');
    setAnimating(true);
    auth()
      .createUserWithEmailAndPassword(email, userPassword)
      .then(user => {
        console.log('Registration Successful. Please Login to proceed');
        console.log(user);
        if (user) {
          firestore()
            .collection('Users')
            .add({
              name: userName,
              email: email,
            })
            .then(() => {
              console.log('User added!');
            });
          auth()
            .currentUser.updateProfile({
              displayName: userName,
            })
            .then(() => {
              setAnimating(false);
              navigation.replace('Login');
            })
            .catch(error => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch(error => {
        setAnimating(false);
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          setErrortext('That email address is already in use!');
        } else {
          setErrortext(error.message);
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/login.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 10,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'white',
              marginBottom: 20,
            }}>
            User Register
          </Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={email => setEmail(email)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserPassword => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
            }}></View>

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}

          <TouchableOpacity
            style={[styles.buttonStyle, animating && {opacity: 0.4}]}
            activeOpacity={0.5}
            disabled={animating}
            onPress={handleSubmitButton}>
            {animating && (
              <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
              />
            )}
            {!animating && <Text style={styles.buttonTextStyle}>REGISTER</Text>}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  dropDownContainer: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    height: 50,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 40,
  },
});
