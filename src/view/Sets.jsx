import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import axios from 'axios';

export const Sets = () => {
    const [armorSets, setArmorSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedSet, setExpandedSet] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchArmorSets = async () => {
        try {
            const response = await axios.get('https://mhw-db.com/armor/sets');
            setArmorSets(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArmorSets();
    }, []);

    const toggleExpansion = async (setId) => {
        if (expandedSet === setId) {
            setExpandedSet(null); // Si ya está expandido, colapsarlo
        } else {
            try {
                const response = await axios.get(`https://mhw-db.com/armor/sets/${setId}`);
                const updatedSets = armorSets.map(set =>
                    set.id === setId ? { ...set, pieces: response.data.pieces } : set
                );
                setArmorSets(updatedSets);
                setExpandedSet(setId); // Expandir el conjunto
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleSearch = (text) => {
        setSearchTerm(text);
    };

    const filteredArmorSets = armorSets.filter(set => {
        return set.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const renderPiece = ({ item }) => (
        <View style={styles.pieceContainer}>
            <Image style={styles.image} source={{ uri: item.assets.imageMale }} />
            <View style={styles.pieceDetails}>
                <Text style={styles.pieceName}>{item.name}</Text>
                <Text style={styles.pieceDescription}>Defense: {item.defense.base} (Max: {item.defense.max})</Text>
                <Text style={styles.pieceDescription}>Rarity: {item.rarity}</Text>
                <Text style={styles.pieceDescription}>Fire Resistance: {item.resistances.fire}</Text>
            </View>
        </View>
    );

    const renderSetDetail = (set) => {
        return (
            <FlatList
                data={set.pieces}
                renderItem={renderPiece}
                keyExtractor={(piece) => piece.id.toString()}
                contentContainerStyle={styles.detailContainer}
            />
        );
    };

    const renderSet = ({ item }) => (
        <TouchableOpacity onPress={() => toggleExpansion(item.id)}>
            <View style={styles.setContainer}>
                <Text style={styles.setName}>{item.name}</Text>
                {expandedSet === item.id && renderSetDetail(item)}
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Image
                    source={{ uri: 'https://media.tenor.com/1efpG-4R5sAAAAAi/monster-hunter.gif' }}
                    style={styles.loadingImage}
                />
                <Text style={styles.loadingText}>Loading Sets...</Text>
            </View>
        );
    }

    return (

        <ImageBackground
            source={{ uri: 'https://mfiles.alphacoders.com/100/1000753.jpeg' }}  // URL de la imagen de fondo
            style={styles.backgroundImage}
            resizeMode="cover">
            <TextInput
                style={styles.input}
                placeholder="Search Armor Sets..."
                onChangeText={handleSearch}
                value={searchTerm}
                placeholderTextColor="#ffffff"  // Color de texto del texto de busqueda
            />
            <FlatList
                data={filteredArmorSets}
                renderItem={renderSet}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'transparent'
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingImage: {
        width: 250,
        height: 200,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    list: {
        padding: 10,
    },
    setContainer: {
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
    detailContainer: {
        paddingTop: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginTop: 10,
    },
    setName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    pieceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    pieceDetails: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 3,
    },
    pieceName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    pieceDescription: {
        fontSize: 14,
        color: '#fff',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});

export default Sets;
