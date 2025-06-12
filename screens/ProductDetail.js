import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProductDetail = ({ route }) => {
    const { productImage, title, price, description } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(price);
    const insets = useSafeAreaInsets();

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotalPrice(price * (quantity - 1));
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
        setTotalPrice(price * (quantity + 1));
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 + insets.bottom }}>
                <View style={styles.container}>
                    

                    <Image
                        style={styles.image}
                        source={productImage}
                    />
                    <Text style={styles.productTitle}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>

                    
                </View>
            </ScrollView>
            <View style={styles.ctaContainer}> 
                <View style={styles.pricingContainer}>
                    <Text style={styles.productPrice}>Price: €{totalPrice}</Text>

                    <View style={styles.counterContainer}>
                        <TouchableOpacity style={styles.counterButton} onPress={handleDecrease}>
                            <Text style={styles.counterText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity style={styles.counterButton} onPress={handleIncrease}>
                            <Text style={styles.counterText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => console.log('Add to Cart Pressed')} style={styles.ctaButton}>
                    <Text style={styles.ctaButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 0,
        
    },
    productTitle: {
        fontSize: 24,
        fontFamily: 'Inconsolata_700Bold',
        marginTop: 10,
        color: '#222',
        paddingLeft: 15,
        paddingRight: 15,
        textAlign: 'left',
        marginBottom: 10,
    },
    description: {
        padding: 15,
        fontSize: 16,
        color: '#333',
        fontFamily: 'VarelaRound_400Regular',
        textAlign: 'left',
        marginBottom: 10,
    },
    pricingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#1a1a1a',
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
        paddingVertical: 20,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    counterText: {
        fontSize: 24,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#1a1a1a',
        fontFamily: 'Inconsolata_700Bold',
    },
    quantityText: {
        fontSize: 24,
        color: '#1a1a1a',
        fontFamily: 'Inconsolata_700Bold',
    },
    productPrice: {
        fontSize: 20,
        color: '#007aff',
        fontFamily: 'Inconsolata_700Bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    ctaContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 10,
        alignItems: 'stretch',
    },
    ctaButton: {
        backgroundColor: '#007aff',
        borderRadius: 0,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    ctaButtonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Inconsolata_700Bold',
        textAlign: 'center',
    }
    
});

export default ProductDetail;