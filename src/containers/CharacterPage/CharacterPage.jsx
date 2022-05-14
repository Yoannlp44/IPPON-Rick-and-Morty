import React from 'react';
import { View, Text, SafeAreaView, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CharacterPage = ({ navigation, route: { params: { data } } }) => {

    const handleBack = () => navigation.goBack();

    console.log(data);
    return (
        <View style={styles.containerWrapper}>
            <SafeAreaView style={styles.container}>
                <Pressable onPress={handleBack} style={{ flexDirection: 'row' }}>
                    <AntDesign name="caretleft" size={24} color="black" />
                    <Text>Back</Text>
                </Pressable>
                <View style={styles.character}>
                    {data.image && (
                        <Image source={{ uri: data.image }} style={styles.image} />
                    )}
                    <View style={styles.details}>
                        <Text>Name : {data.name !== '' ? data.name : 'Unknown'}</Text>
                        <Text>Gender : {data.gender !== '' ? data.gender : 'Unknown'}</Text>
                        <Text>Species : {data.species !== '' ? data.species : 'Unknown'}</Text>
                        <Text>Status : {data.status !== '' ? data.status : 'Unknown'}</Text>
                        <Text>Type : {data.type !== '' ? data.type : 'Unknown'}</Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerWrapper: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    container: {
        paddingStart: 20,
        paddingEnd: 20,
        paddingTop: 50,
    },
    character: {
        paddingTop: 20,
        alignItems: 'center',
        width: width - 40,
        height: height,
    },
    image: {
        width: width - 40,
        height: height / 2,
    },
    details: {
        paddingTop: 20,
    },
});

export default CharacterPage;