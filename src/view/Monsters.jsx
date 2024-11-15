import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import axios from 'axios';

export const Monsters = () => {
    const [monsters, setMonsters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedMonster, setExpandedMonster] = useState(null);
    const [expandedMonsterDetails, setExpandedMonsterDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    

    const fetchMonsters = async () => {
        try {
            const response = await axios.get('https://mhw-db.com/monsters');
            setMonsters(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const fetchMonsterDetails = async (id) => {
        try {
            const response = await axios.get(`https://mhw-db.com/monsters/${id}`);
            setExpandedMonsterDetails(response.data);
        } catch (error) {
            console.error('Error fetching monster details:', error);
        }
    };

    useEffect(() => {
        fetchMonsters();
    }, []);

    const toggleExpansion = (id) => {
        if (expandedMonster === id) {
            setExpandedMonster(null);
            setExpandedMonsterDetails(null);
        } else {
            setExpandedMonster(id);
            fetchMonsterDetails(id);
        }
    };

    const handleSearch = (text) => {
        setSearchTerm(text);
    };

    const filteredMonsters = monsters.filter(monster => {
        return monster.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const renderMonsterName = ({ item }) => (
        <TouchableOpacity onPress={() => toggleExpansion(item.id)}>
            <View style={[styles.monsterContainer, { alignItems: 'center' }]}>
                <Text style={styles.name}>{item.name}</Text>
                {expandedMonster === item.id && expandedMonsterDetails && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.description}>{expandedMonsterDetails.description}</Text>
                        <Text style={styles.detail}>Type: {expandedMonsterDetails.type}</Text>
                        <Text style={styles.detail}>Species: {expandedMonsterDetails.species}</Text>
                        <Text style={styles.detail}>Weaknesses:</Text>
                        {expandedMonsterDetails.weaknesses && expandedMonsterDetails.weaknesses.map((weakness, index) => (
                            <Text key={index} style={styles.detail}>
                                {weakness.element.charAt(0).toUpperCase() + weakness.element.slice(1)}: {weakness.stars} stars
                            </Text>
                        ))}
                        <Text style={styles.detail}>Resistances:</Text>
                        {expandedMonsterDetails.resistances && expandedMonsterDetails.resistances.map((resistance, index) => (
                            <Text key={index} style={styles.detail}>
                                {resistance.element.charAt(0).toUpperCase() + resistance.element.slice(1)}: {resistance.condition || 'None'}
                            </Text>
                        ))}
                        <Text style={styles.detail}>Locations:</Text>
                        {expandedMonsterDetails.locations && expandedMonsterDetails.locations.map((location, index) => (
                            <Text key={index} style={styles.detail}>
                                {location.name} (Zone Count: {location.zoneCount})
                            </Text>
                        ))}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Image
                    source={{ uri: 'https://giffiles.alphacoders.com/132/13273.gif' }}
                    style={styles.loadingImage}
                />
                <Text style={styles.loadingText}>Loading Monster...</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={{ uri: 'https://mfiles.alphacoders.com/100/1000753.jpeg' }}  // URL de la imagen de fondo
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Search Monsters..."
                    onChangeText={handleSearch}
                    value={searchTerm}
                    placeholderTextColor="#ffffff"  // Color de texto del texto de busqueda
                />
                <FlatList
                    data={filteredMonsters}
                    renderItem={renderMonsterName}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingImage: {
        width: 400,
        height: 200,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    container: {
        flex: 1,
        padding: 10,
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
        flexGrow: 1,
    },
    monsterContainer: {
        flexDirection: 'column',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#00000099',  // Color de fondo oscuro para cada monstruo
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1.5,
        width: '100%',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 5,
    },
    detailsContainer: {
        marginTop: 10,
    },
    detail: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 3,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});

export default Monsters;
