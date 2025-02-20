import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = () => {
    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={require('../assets/hermanmiller.jpg')}
            />
            <Text style={styles.productTitle}>Herman Miller Chair</Text>
            <Text>$1,200.00</Text>

        </View>
    );
}

// styles
const styles = StyleSheet.create({
    card: {
        width: '100vw',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        gap: 10,

    },
    image: {
        // fit the card and make it contain
        width: '100%',
        height: 200,        
        borderRadius: 10,
        
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    }
});

export default ProductCard;

