import { useState } from 'react';
import {
  FlatList,
  Image,
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
  const [buscouPor, setBuscouPor] = useState('')

  const buscarPorNome = async () => {
    try {
      const resposta = await fetch(`https://restcountries.com/v3.1/name/${busca}`)
      if (!resposta.ok) {
        throw new Error()
      }

      setBuscouPor('nome')

      const primeiro: Pais = (await resposta.json())[0];
      setPaises([primeiro]);
    } catch (error) {
      alert(`País não encontrado`);
    }
  }

  const buscarPorCapital = async () => {
    try {
      const resposta = await fetch(`https://restcountries.com/v3.1/capital/${busca}`)
      if (!resposta.ok) {
        throw new Error()
      }

      setBuscouPor('capital')

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
        placeholder='Digite aqui...'
        value={busca}
        onChangeText={(newText) => setBusca(newText)}
      />

      <Pressable
        onPress={buscarPorNome}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          Buscar por nome do país
        </Text>
      </Pressable>

      <Pressable
        onPress={buscarPorCapital}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          Buscar por capital do país
        </Text>
      </Pressable>

      <FlatList
        style={styles.list}
        data={paises}
        renderItem={({ item }) => (
          <View style={styles.listEntry}>
            {buscouPor === 'nome'
              ?
              <Text style={styles.listEntryText}>
                Nome comum: {item.name.common}
              </Text>
              : null}

            <Text style={styles.listEntryText}>
              Nome oficial: {item.name.official}
            </Text>

            {buscouPor === 'nome'
              ?
              <Text style={styles.listEntryText}>
                Nome em russo: {
                  item.translations?.rus?.official
                  || item.translations?.rus?.common
                  || 'Indisponível'
                }
              </Text>
              : null}

            {buscouPor === 'nome'
              ?
              <Text style={styles.listEntryText}>
                OpenStreetMap: {item.maps.openStreetMaps}
              </Text>
              : null}

            {buscouPor === 'capital'
              ?
              <Image
                source={{ uri: item.flags.png }}
                style={styles.image}
              />
              : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: 48,
    paddingHorizontal: 16,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    color: '#111827',
    fontSize: 15,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '100%',
  },

  button: {
    width: '100%',
    backgroundColor: '#0077CC',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },

  list: {
    width: '100%',
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },

  listEntry: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    gap: 4,
  },

  listEntryText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  image: {
    width: 160,
    height: 106,
    borderRadius: 4,
    marginTop: 4,
  },
});
