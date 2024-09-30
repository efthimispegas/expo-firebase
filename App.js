import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged({user}) {
    console.log({ user });
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // Handle error
  function onSignError(error) {
    console.log({ error });
    throw error;
  }

  useEffect(() => {
    console.log({ auth: auth().config });
    const subscriber = auth()
      .signInWithEmailAndPassword('efthimispegas@gmail.com', "Pass@123")
      .then(onAuthStateChanged)
      .catch(onSignError)
    return subscriber; // unsubscribe on unmount
  }, []);


  // UI
  if (initializing) return null;

  if (!user) {
    return (
      <>
        <StatusBar style='auto' />
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text>Not logged in</Text>
          </View>
      </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar style='auto' />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text>Welcome {user.email}</Text>
        </View>
      </SafeAreaView>
    </>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
