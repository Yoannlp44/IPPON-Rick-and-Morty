import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
import CharacterCard from '../../components/CharacterCard';
// TODO: Get all Rick and morty characters from API
// TODO: Display all characters on screen, must be scrollable
// TODO: Add search bar to filter characters by name, status (alive, dead, etc), species, type, gender

const CharacterStatus = [
  { label: '', value: '' },
  { label: 'Alive', value: 'Alive' },
  { label: 'Dead', value: 'Dead' },
  { label: 'unknown', value: 'unknown' },
]

const CharacterGender = [
  { label: '', value: '' },
  { label: 'Female', value: 'Female' },
  { label: 'Male', value: 'Male' },
  { label: 'Genderless', value: 'Genderless' },
  { label: 'Unknown', value: 'unknown' },
];


const GET_CHARACTERS = gql`
  query ($status: String, $gender: String, $page: Int) {
    characters (page: $page filter: {status: $status, gender: $gender}) {
      info {
        pages
      }
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

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

const HomePage = () => {
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [openStatusList, setOpenStatusList] = useState(false);
  const [openGenderList, setOpenGenderList] = useState(false);
  const [statusItem, setStatusItems] = useState(CharacterStatus);
  const [genderItem, setGenderItems] = useState(CharacterGender);
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { status, gender, page },
  });

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
        <DropDownPicker
          open={openStatusList}
          value={status !== '' ? status : 'Select the Status'}
          items={statusItem}
          setOpen={setOpenStatusList}
          setValue={setStatus}
          setItems={setStatusItems}
          placeholder="Select the status"
          containerStyle={{ paddingBottom: 10 }}
          onChangeValue={() => setPage(1)}
        />
        <DropDownPicker
          open={openGenderList}
          value={gender !== '' ? gender : 'Select the gender'}
          items={genderItem}
          setOpen={setOpenGenderList}
          setValue={setGender}
          setItems={setGenderItems}
          placeholder="Select the gender"
          onChangeValue={() => setPage(1)}
          zIndex={1}
        />
        <View style={styles.content}>
        <ScrollView>
          {data.characters.results.map(character => (
            <CharacterCard key={character.id} data={character} />
          ))}
          {data.characters.info.pages > page && (
            <Button title="Next Page" onPress={() => setPage(page + 1)} />
          )}
        </ScrollView>
        </View>
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
  },
  content: {
   height: windowHeight - 200,
  },
});

export default HomePage;