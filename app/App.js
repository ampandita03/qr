import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const App = () => {
  const [link, setLink] = useState('');
  const [url, setUrl] = useState(null);

  const generateQr = async () => {
    try {
      let response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(link)}`
      );
      if (!response.ok) {
        Alert.alert('Something went wrong!');
        return;
      } 
      else{
        Alert.alert('QR Generated! Please Scan to verify!!');
      }
      
      const imageUrl = response.url;
      console.log('Generated QR Code URL:', imageUrl);

      setUrl(imageUrl);

    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 30, marginTop: 30 ,fontWeight:'600' }}>QR CODE GENERATOR</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter URL to generate QR"
          style={styles.textInput}
          placeholderTextColor="black"
          keyboardAppearance="light"
          onChangeText={(val) => {
            setLink(val);
            console.warn(val);
         
          }}
          value={link}
        />
        <Entypo name="link" size={22} color="black" style={styles.icon} />
        <TouchableOpacity
          style={styles.button}
          onPress={generateQr}
          disabled={!link}
        >
          <Text style={{ color: 'white' }}>Generate QR</Text>
        </TouchableOpacity>
      </View>
      {url ? (
        <View style={styles.qrImage}>
          <Image
            source={{ uri: url }}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
          <Text>Nothing to Generate</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputContainer: {
    height: 250,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  textInput: {
    height: 55,
    width: 330,
    backgroundColor: 'white',
    borderWidth:1,
    paddingLeft: 50,
    borderRadius: 5,
    position: 'relative',
    top: 80,
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: 95,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#24A0ED',
  },
  qrImage: {
    marginTop: 60,
    height: 250,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
