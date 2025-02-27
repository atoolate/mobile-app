import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

const HomeBanner = () => {
    return (
        <View>
            <Image
                style={styles.image}
                source={require('../assets/homeofficehero.jpg')}
            />
            
        </View>
    );
}

// styles
const styles = StyleSheet.create({
    image: {
        height: 200,
        borderRadius: 10,
        maxWidth: '90%',
    },
});

export default HomeBanner;