import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

const ProductDetail = (navigation) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/hermanmiller.jpg')}
            />
            <Text style={styles.productTitle}>Herman Miller Chair</Text>
            <Text>$1,200.00</Text>
            <Text style={styles.description}>This is a very comfortable chair. It is perfect for your home office.</Text>
            <TouchableOpacity                 
                onPress={() => console.log('Add to Cart Pressed')}
            >
                <Text style={styles.ctaButton}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100vw',
    },
    image: {
        width: '100%',
        height: 300,        
        
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    description: {
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    ctaButton: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 20,
        borderRadius: 5,
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
    }
    
});

export default ProductDetail;