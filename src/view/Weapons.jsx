import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import axios from 'axios';

export const Weapons = () => {
    const [weapons, setWeapons] = useState([]);
    const [filteredWeapons, setFilteredWeapons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchWeapons = async () => {
        try {
            const response = await axios.get('https://mhw-db.com/weapons');
            setWeapons(response.data);
            setFilteredWeapons(response.data); // Inicialmente, mostramos todas las armas
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeapons();
    }, []);

    const toggleExpansion = (id) => {
        setFilteredWeapons(prevWeapons =>
            prevWeapons.map(weapon =>
                weapon.id === id ? { ...weapon, expanded: !weapon.expanded } : weapon
            )
        );
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = weapons.filter(weapon =>
            weapon.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredWeapons(filtered);
    };

    const renderWeapon = ({ item }) => (
        <TouchableOpacity onPress={() => toggleExpansion(item.id)}>
            <View style={styles.weaponContainer}>
                <Image style={styles.image} source={{ uri: item.assets.icon }} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.expanded && (
                        <>
                            <Text style={styles.type}>Type: {item.type}</Text>
                            <Text style={styles.attack}>Attack: {item.attack.display}</Text>
                            <Text style={styles.materialsHeader}>Upgrade Materials:</Text>
                            {item.crafting.upgradeMaterials && item.crafting.upgradeMaterials.map((material, index) => (
                                <Text key={index} style={styles.material}>
                                    {material.item.name} x{material.quantity}
                                </Text>
                            ))}
                        </>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Image
                    source={{ uri: 'https://media.tenor.com/kdI9P_Xf9yEAAAAi/diablos-run.gif' }}
                    style={styles.loadingImage}
                />
                <Text style={styles.loadingText}>Loading Weapons...</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={{ uri: 'https://mfiles.alphacoders.com/100/1000753.jpeg' }}  // URL de la imagen de fondo
            style={styles.backgroundImage}
            resizeMode="cover">
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Search weapons..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <FlatList
                    data={filteredWeapons}
                    renderItem={renderWeapon}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'transparent'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingImage: {
        width: 300,
        height: 150,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        backgroundColor: '#00000099',  // Fondo semitransparente para el campo de búsqueda
        color: '#ffffff',  // Color de texto para el campo de búsqueda
    },
    list: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    weaponContainer: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    type: {
        fontSize: 16,
        color: '#666',
    },
    attack: {
        fontSize: 16,
        color: '#666',
    },
    materialsHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    material: {
        fontSize: 14,
        color: '#666',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});

export default Weapons;