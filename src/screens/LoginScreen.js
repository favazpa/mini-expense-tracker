// import React, {useEffect, useLayoutEffect, useState} from 'react'
// import {StyleSheet, View, KeyboardAvoidingView} from 'react-native'
// import {Input, Button, Image, Text} from 'react-native-elements'
// import { StatusBar } from 'react-native'

// import auth from '@react-native-firebase/auth';

// const LoginScreen = ({navigation}) => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [submitLoading, setSubmitLoading] = useState(false)

//   const signIn = () => {
//     if (email && setEmail) {
//       setSubmitLoading(true)
//       auth()
//         .signInWithEmailAndPassword(email, password)
//         .then(() => clearInputFields())
//         .catch((error) => alert(error.message) & setSubmitLoading(false))
//     } else {
//       alert('All fields are mandatory')
//       setSubmitLoading(false)
//     }
//   }
//   const clearInputFields = () => {
//     alert('Successfully Logged in')
//     navigation.replace('Home')
//     setSubmitLoading(false)
//     setEmail('')
//     setPassword('')
//   }

//   const [loading, setLoading] = useState(true)
//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged((authUser) => {
//       if (authUser) {
//         navigation.replace('Home')
//         setLoading(false)
//       } else {
//         setLoading(false)
//       }
//     })
//     return unsubscribe
//   }, [])
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: 'Loading...',
//     })
//     if (!loading) {
//       navigation.setOptions({
//         title: 'Login',
//       })
//     }
//   }, [navigation, loading])

//   return (
//     <>
//       {!loading ? (
//         <KeyboardAvoidingView behavior='padding' style={styles.container}>
//           <StatusBar style='light' />
//           <Image
//             source={{
//               uri:
//                 'https://static-s.aa-cdn.net/img/gp/20600011886807/to-aGJ31KLwqc9AWaBUyL6NLbpFwN9VEliX7nQ_AU48aO4jH6M1MltWKmThWJPndJg=s300?v=1',
//             }}
//             style={{width: 100, height: 100, marginBottom: 50}}
//           />
//           <View style={styles.inputContainer}>
//             <Input
//               type='email'
//               placeholder='Email'
//               value={email}
//               onChangeText={(text) => setEmail(text)}
//             />
//             <Input
//               type='password'
//               secureTextEntry
//               placeholder='Password'
//               value={password}
//               onChangeText={(text) => setPassword(text)}
//               onSubmitEditing={signIn}
//             />
//           </View>
//           <Button
//             loading={submitLoading}
//             containerStyle={styles.button}
//             title='Login'
//             onPress={signIn}
//           />
//           <Button
//             onPress={() => navigation.navigate('Register')}
//             containerStyle={styles.button}
//             title='Register'
//             type='outline'
//           />
//           <View style={{height: 50}}></View>
//         </KeyboardAvoidingView>
//       ) : (
//         <View style={styles.container}>
//           <StatusBar style='light' />
//           <Image
//             source={{
//               uri:
//                 'https://static-s.aa-cdn.net/img/gp/20600011886807/to-aGJ31KLwqc9AWaBUyL6NLbpFwN9VEliX7nQ_AU48aO4jH6M1MltWKmThWJPndJg=s300?v=1',
//             }}
//             style={{width: 100, height: 100, marginBottom: 50}}
//           />
//           <Text h4>Loading...</Text>
//         </View>
//       )}
//     </>
//   )
// }
// export default LoginScreen

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


import React, {useState, createRef, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';


import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');


  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(user => {
        console.log('user', user);
        // If server response message same as Data Matched
        if (user) navigation.replace('Home');
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') setErrortext(error.message);
        else if (error.code === 'auth/user-not-found')
          setErrortext('No User Found');
        else {
          setErrortext('Please check your email id or password');
        }
      });
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
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
                User Login
              </Text>
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                selectionColor={'grey'}
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                selectionColor={'grey'}
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Register')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#307ecc',
    backgroundColor: 'black',
    alignContent: 'center',
  },
  sectionStyle: {
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
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
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
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
