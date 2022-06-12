import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CharacterCard = ({ data }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('CharacterPage', { data: data });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                {data.image && (
                    <Image source={{ uri: data.image }} style={styles.image} />
                )}
                <View style={styles.details}>
                    <Text style={styles.text}>
                        {data.name}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 24,
        borderRadius: 20,
    },
    image: {
        width: 70,
        height: 70
    },
    details: {
        flex: 1,
        marginLeft: 50,
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CharacterCard;