import React from 'react';
import { View, Text, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
                    <Text>{data.name}</Text>
                    <Text>{data.gender}</Text>
                    <Text>{data.species}</Text>
                    <Text>{data.status}</Text>
                    <Text>{data.type}</Text>
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
    character : {
        paddingTop: 20,
        alignItems: 'center',
    }
});

export default CharacterPage;