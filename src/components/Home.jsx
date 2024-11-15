import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export const Home = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={{uri: "https://cdn.zatu.com/wp-content/uploads/2024/04/08092233/MONSTER-HUNTER-WORLD-LOGO-1-500x176.png"}}
                />
                <Text style={styles.title}>Bienvenidos a la guía de Monster Hunter World</Text>
            </View>
            
            <View style={styles.menu}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.navigate('Monsters')}
                >
                    <Icon name="paw" size={24} color="#4CAF50" />
                    <Text style={styles.menuButtonText}>Monstruos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.navigate('Sets')}
                >
                    <Icon name="shield" size={24} color="#4CAF50" />
                    <Text style={styles.menuButtonText}>Sets</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.navigate('Weapons')}
                >
                    <Icon name="crosshairs" size={24} color="#4CAF50" />
                    <Text style={styles.menuButtonText}>Armas</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111', // Fondo oscuro
    },
    header: {
        backgroundColor: '#222', // Fondo oscuro ligeramente más claro
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: 400,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        color: '#ddd', // Texto gris claro para contraste
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    menu: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#333', // Fondo oscuro para el menú
        padding: 20,
        marginVertical: 20,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#444', // Fondo oscuro para los botones del menú
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginVertical: 10,
        width: '80%',
    },
    menuButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#ddd', // Texto gris claro para contraste
    },
});

export default Home;
