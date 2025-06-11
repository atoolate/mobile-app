import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ productImage, title, price, style = {} }) => {
    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={productImage}
            />
            <Text style={[styles.productTitle, style.productTitle]}>{title}</Text>
            <Text style={styles.productPrice}>${price}</Text>
        </View>
    );
}

// styles
const styles = StyleSheet.create({
    card: {
        width: '100%',
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
        width: '100%',
        height: 300,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,        
    },
    productTitle: {
        fontSize: 16,
        fontFamily: 'Inconsolata_700Bold',
        marginTop: 10,
        paddingLeft: 10,
        height: 60,
        overflow: 'auto',
    },
    productPrice: {
        fontSize: 16,
        paddingLeft: 10,
        paddingBottom: 10,
    },
});

export default ProductCard;

