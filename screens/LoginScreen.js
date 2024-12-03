import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username) {
      navigation.navigate('Main', { username });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Corrigido para usar require
        style={styles.logo}
      />
      <Text style={styles.title}>Bem-vindo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#B39DDB"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75, // Torna a imagem circular
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#B39DDB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#4A148C',
  },
  button: {
    backgroundColor: '#6200EA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
