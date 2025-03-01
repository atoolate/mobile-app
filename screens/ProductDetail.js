import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

const ProductDetail = ({ route }) => {
    const { productImage, title, price, description } = route.params;
    const [quantity, setQuantity] = useState(1);
    
    // Ensure the price is a number (remove $ sign if present)
    const unitPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    const [totalPrice, setTotalPrice] = useState(unitPrice);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotalPrice(unitPrice * (quantity - 1));
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
        setTotalPrice(unitPrice * (quantity + 1));
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={productImage}
            />
            <Text style={styles.productTitle}>{title}</Text>
            <Text style={styles.description}>{description}</Text>

            {/* add to cart states */}
            <View style={styles.counterContainer}>
                <TouchableOpacity style={styles.counterButton} onPress={handleDecrease}>
                    <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.counterButton} onPress={handleIncrease}>
                    <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.productPrice}>Total Price: €{totalPrice}</Text>

            {/* add to cart button */}
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
        sizeMode: 'cover',
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
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 30,
    },
    counterButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    counterText: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'montserrat',
    },
    quantityText: {
        fontSize: 24,
        color: 'black',
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