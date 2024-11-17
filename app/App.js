import React from 'react';
import {View, Text, StyleSheet,SafeAreaView,TextInput} from 'react-native';
const App = () => {
    return (
        <SafeAreaView style={styles.container}>
                <View>
                    <TextInput title/>
                </View>
        </SafeAreaView>
    )
}
export default App;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})