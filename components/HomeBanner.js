import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

const HomeBanner = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/homeofficehero.jpg')}
                resizeMode='cover'
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
            >
                <View style={styles.bannerText}>
                    <Text style={styles.heading}>Welcome to Deskly</Text>
                    <Text style={styles.subheading}>Your one-stop shop for home office furniture</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

// styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        paddingTop: 20,
        alignItems: 'center',
        gap: 10,
    },
    bannerText: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
        borderRadius: 10,
        gap: 5,
    },
    heading: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subheading: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },

});

export default HomeBanner;