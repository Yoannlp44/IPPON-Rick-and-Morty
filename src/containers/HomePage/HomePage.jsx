import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import ModalSelector from 'react-native-modal-selector'
import CharacterCard from '../../components/CharacterCard';

// TODO: Get all Rick and morty characters from API
// TODO: Display all characters on screen, must be scrollable
// TODO: Add search bar to filter characters by name, status (alive, dead, etc), species, type, gender

const CharacterStatus = {
  Alive: 'Alive',
  Dead: 'Dead',
  Unknown: 'Unknown',
};

const CharacterGender = {
  Female: 'Female',
  Male: 'Male',
  Genderless: 'Genderless',
  Unknown: 'unknown',
}; 


const GET_CHARACTERS = gql`
  query ($status: String, $gender: String) {
    characters (filter: {status: $status, gender: $gender}) {
      results {
        name
        id
        type
        status
        species
        gender
        image
      }
    }
  }
  `;

const HomePage = () => {
  const [status, setStatus] = useState();
  const [gender, setGender] = useState();
  const pickerRef = useRef();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { status, gender },
  });
  
  function open() {
    pickerRef.current.focus();
  }
  
  function close() {
    pickerRef.current.blur();
  }

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Error...</Text>
      </SafeAreaView>
    )
  }

  console.log(loading, error, data);
  
  return (
    <View style={styles.containerWrapper}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
        {data.characters.results.map(character => (
         <CharacterCard key={character.id} data={character} />
        ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  container: {
    paddingStart: 20,
    paddingEnd: 20,
  }
});

export default HomePage;


// fetch('https://rickandmortyapi.com/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     query: `
//         {
//           characters {
//                  results {
//                    name
//                    id
//                    type
//                    status
//                    species
//                    gender
//                    image
//                  }
//                }
//         }
//     `,
//   }),
// })
//   .then(res => res.json())
//   .then(res => console.log(res.data.characters.results))