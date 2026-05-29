import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

interface Pais {
  name: {
    common: string;
    official: string;
  };
  translations?: {
    rus?: {
      common?: string;
      official?: string;
    };
  };
  flags: {
    png: string;
  };
  maps: {
    openStreetMaps: string;
  };
}

export default function App() {
  const [busca, setBusca] = useState('')
  const [paises, setPaises] = useState<Pais[]>([])

  const buscarPorNome = async () => {
    try {
      const resposta = await fetch(`https://restcountries.com/v3.1/name/${busca}`)

      const primeiro: Pais = (await resposta.json())[0];
      setPaises([primeiro]);
    } catch (error) {
      alert(`País não encontrado`);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Digite aqui o nome do país...'
        value={busca}
        onChangeText={(newText) => setBusca(newText)}
      />
      <Pressable
        onPress={buscarPorNome}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          Buscar
        </Text>
      </Pressable>

      <FlatList
        style={styles.list}
        data={paises}
        renderItem={({ item }) => (
          <View style={styles.listEntry}>
            <Text style={styles.listEntryText}>
              Nome comum: {item.name.common}
            </Text>
            <Text style={styles.listEntryText}>
              Nome oficial: {item.name.official}
            </Text>
            <Text style={styles.listEntryText}>
              Nome em russo: {
                item.translations?.rus?.official
                || item.translations?.rus?.common
                || 'Indisponível'
              }
            </Text>
            <Text style={styles.listEntryText}>
              OpenStreetMap: {item.maps.openStreetMaps}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {

  },
  buttonText: {

  },
  container: {
  },
  input: {},
  list: {},
  listEntry: {

  },
  listEntryText: {

  },
});
