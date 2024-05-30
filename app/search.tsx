import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchData } from '../api/api';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Search = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [mainData, setMainData] = useState({ places: [], categories: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const { places, categories } = mainData;
  const router = useRouter();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await fetchData();
        setMainData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // Handle error here if needed
      }
    };

    fetchAllData();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text.toLowerCase());
  };

  const filteredPlacesData = places.filter(place =>
    place.name.toLowerCase().includes(searchQuery)
  );

  return (
    <SafeAreaView style={{alignItems:'center'}}>
      <View style={styles.searchbar}>
        <TextInput placeholder="Search..." value={searchQuery} onChangeText={handleSearch} placeholderTextColor="gray" style={styles.searchinput}/>
        <TouchableOpacity onPress={() => handleSearch(searchQuery)}>
          <Feather name="search" size={24} style={styles.search}/>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          {filteredPlacesData.map((place, index) => (
            // <TouchableOpacity key={place.id} onPress={() => navigation.navigate("News")}>
            <TouchableOpacity key={index} onPress={() => router.push(`/place/${place.slug}`)}>
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              {place.photo && (
                <Image source={{ uri: place.photo }} style={[styles.Image]} />
              )}
              <View>
                <Text style={styles.categoryNews}>{place.category.name}</Text>
                <Text style={[styles.tittle]}>{place.name}</Text>
              </View>
            </View>
            </TouchableOpacity>
          )) }
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  
  searchbar:{height: 49, flexDirection:  'row', justifyContent: 'center', alignContent: 'center', backgroundColor:   '#EAEAEA', borderRadius:    11, marginVertical: 10, width: 300},
  searchinput: { flex: 1, backgroundColor: 'secondary', borderRadius:  10, marginStart:13},
  news: {
    flexDirection: "row",
  },
  search: {
    marginHorizontal:   21, marginVertical: 12
  },
  Image: {
     borderRadius: 10, 
     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6, padding: 5, width: 146, height: 129, marginTop: 20,
  },
  newsRight: {
    flex: 1, width: 165, height: 151, justifyContent: 'center', verticalAlign:'middle',

  },
  categoryNews:{
    flex: 1, color: '#FFB534', fontWeight : 'bold', fontSize: 14, marginLeft: 20,verticalAlign:'middle', marginTop: 50
  },

  tittle: {
    flex: 1,
    marginVertical: -30,
    color: '#527853',
    fontWeight: 900,
    fontSize: 17,
    marginLeft: 20,
    width: 165,
  },

  container: {
    flex: 1,
  },

  content: {
    flex: 1, marginTop: 30 , marginLeft: 20,
  },

  heading: {
    color: '#000000', fontWeight: 800, fontSize: 30, 
  },
})