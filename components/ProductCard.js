import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ productImage, title, price, style = {} }) => {
    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={productImage}
            />
            <View style={styles.textCard} >
                <Text style={[styles.productTitle, style.productTitle]}>{title}</Text>
                <Text style={styles.productPrice}>${price}</Text>
            </View>
            
        </View>

    );
}

// styles
const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#fff',
        color: '#1a1a1a',
        marginBottom: 20,
        borderColor: '#1a1a1a',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 300,
        alignSelf: 'center',
             
    },
    productTitle: {
        fontSize: 18,
        fontFamily: 'Inconsolata_700Bold',
        marginTop: 10,
        paddingLeft: 10,
        height: 60,
        overflow: 'auto',
    },
    productPrice: {
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
        fontFamily: 'Inconsolata_700Bold',
        color: '#007aff',
        
    }
});

export default ProductCard;

