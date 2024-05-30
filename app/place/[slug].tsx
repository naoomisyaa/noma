import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const PlaceDetail = () => {
  const { slug } = useLocalSearchParams();
  const [place, setPlace] = useState<any>(null);
  const [categories, setCategories] = useState([]);

  const getPlace = async () => {
    const response = await fetch(`https://dewalaravel.com/api/places/${slug}`);
    const placeData = await response.json();
    setPlace(placeData.data);
  };

  useEffect(() => {
    getPlace();
  }, [slug]);

  if (!place) {
    return <Text>Mohon Tunggu</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: place.photo }} style={styles.image} />
        <View style={[styles.place]}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.description}>{place.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: '100%',
    height: 200,
    // borderRadius: 8,
  },
place:{
  backgroundColor: '#f3f3f3',
  padding: 20,
  marginTop: -15,
  borderRadius: 20,
},
  name: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 20,
    color: '#527853',
    marginBottom: 40, 
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    justifyContent: 'center',
    margin: 10, 
    textAlign: 'justify',
  },
});

export default PlaceDetail;