import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';

import CharacterCard from '../../components/CharacterCard';

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

const windowHeight = Dimensions.get('window').height;

const HomePage = () => {
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [openStatusList, setOpenStatusList] = useState(false);
  const [openGenderList, setOpenGenderList] = useState(false);
  const [statusItem, setStatusItems] = useState(CharacterStatus);
  const [genderItem, setGenderItems] = useState(CharacterGender);
  const [page, setPage] = useState(1);
  const scrollRef = useRef();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { status, gender, page },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.error}>
        <Text>Error...</Text>
      </SafeAreaView>
    )
  }

  const handleChangeFilter = () => {
    setPage(1);
    scrollRef.current.scrollTo({ y: 0, animated: true });
  };

  const handleChangePage = (page) => {
    setPage(page);
    scrollRef.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.containerWrapper}>
      <SafeAreaView style={styles.container}>
        <DropDownPicker
          open={openStatusList}
          value={status !== '' ? status : 'Select the Status'}
          items={statusItem}
          onSelectItem={handleChangeFilter}
          setOpen={setOpenStatusList}
          setValue={setStatus}
          setItems={setStatusItems}
          placeholder="Select the status"
          containerStyle={{ paddingBottom: 10 }}
        />
        <DropDownPicker
          open={openGenderList}
          value={gender !== '' ? gender : 'Select the gender'}
          items={genderItem}
          onSelectItem={handleChangeFilter}
          setOpen={setOpenGenderList}
          setValue={setGender}
          setItems={setGenderItems}
          placeholder="Select the gender"
          zIndex={1}
        />
        <View style={styles.content}>
          <ScrollView
            ref={scrollRef}
            onContentSizeChange={() => scrollRef.current.scrollTo({ y: 0, animated: true })}
          >
            {data.characters.results.map(character => (
              <CharacterCard key={character.id} data={character} />
            ))}
            {data.characters.info.pages > page && (
              <Button title="Next Page" onPress={() => handleChangePage(page + 1)} />
            )}
            {page > 1 && (
              <Button title="Previous Page" onPress={() => handleChangePage(page - 1)} />
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
    height: windowHeight * 0.8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomePage;