import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image } from 'react-native';

export default function MainScreen({ route }) {
  const { username } = route.params;
  const [brlValue, setBrlValue] = useState('');
  const [conversionData, setConversionData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brlValue && !isNaN(brlValue)) {
      fetch(
        `https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,CAD-BRL,GBP-BRL,JPY-BRL,ARS-BRL`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log('Dados da API:', data); // Log para ver o que está vindo da API
          
          const conversions = [
            {
              flag: require('../assets/eus.png'),
              currency: 'Dólar Americano (USD)',
              value: (parseFloat(brlValue) / parseFloat(data.USDBRL.bid)).toFixed(2),
            },
            {
              flag: require('../assets/reino.png'),
              currency: 'Euro (EUR)',
              value: (parseFloat(brlValue) / parseFloat(data.EURBRL.bid)).toFixed(2),
            },
            {
              flag: require('../assets/canada.png'),
              currency: 'Dólar Canadense (CAD)',
              value: (parseFloat(brlValue) / parseFloat(data.CADBRL.bid)).toFixed(2),
            },
            {
              flag: require('../assets/jap.png'),
              currency: 'Iene Japonês (JPY)',
              value: (parseFloat(brlValue) / parseFloat(data.JPYBRL.bid)).toFixed(2),
            },
            {
              flag: require('../assets/argentina.png'),
              currency: 'Peso Argentino (ARS)',
              value: (parseFloat(brlValue) / parseFloat(data.ARSBRL.bid)).toFixed(2),
            },
          ];
          setConversionData(conversions);
          setError(null); // Limpar qualquer erro anterior
        })
        .catch((err) => {
          console.error('Erro na requisição da API:', err);
          setError('Erro ao carregar os dados. Tente novamente mais tarde.');
        });
    } else {
      setConversionData([]); // Limpar dados de conversão quando o valor for inválido
      setError(null);
    }
  }, [brlValue]);

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Image source={item.flag} style={styles.flag} />
      <Text style={styles.currency}>{item.currency}</Text>
      <Text style={styles.value}>{item.value ? `${item.value}` : '--'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {username}!</Text>
      <Text style={styles.subtitle}>Digite o valor em Reais (R$):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 100"
        keyboardType="numeric"
        value={brlValue}
        onChangeText={setBrlValue}
      />
      {error && <Text style={styles.error}>{error}</Text>} {/* Exibe erro se houver */}
      <FlatList
        data={conversionData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRow}
        style={styles.table}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E5F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 20,
    color: '#4A148C',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#4A148C',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  table: {
    marginTop: 20,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  flag: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
  },
  currency: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A148C',
    flex: 1,
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EA',
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
});
