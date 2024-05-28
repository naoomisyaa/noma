import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, FlatList, ImageBackground, Button,  } from 'react-native';
import React, { useEffect, useState } from 'react';


export default function HomeScreen() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<any>(null);

  // const [selectedCategories, setSelectedCategories] = useState([]);

  const getCategories = () => { 
    fetch('https://dewalaravel.com/api/categories')
    .then(res => res.json())  
    .then((data) => {
      setCategories(data);
    })  
    
    .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    getCategories();
    }, []);
  

  const getPlaces = async () => {
    const response = await fetch("https://dewalaravel.com/api/places");
    const placesData = await response.json();


    console.log(placesData);
    // console.log(categoriesData);
    setPlaces(placesData);
    // setCategories(categoriesData);
 
  };

  useEffect(() => {
    getPlaces();
    // getCategories();
  }, []);

  // const [categories, setCategories] = 

  const getCategory = async () => {
      const response = await fetch("https://dewalaravel.com/api/categories");
      const categoryData = await response.json();

      console.log(categoryData);

      setCategory(categoryData);
  };


  return (
    
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
      <View style={[styles.content]}>
    <Text style={[styles.heading]}>Recomendation</Text>
    {/* <Text style={{color: '#FFB534', fontWeight: 400, fontSize: 14, marginLeft: 270, marginBottom: 10}}>View All</Text> */}

    {/* isi berita */}
    <View style={[styles.news]}>
      <View>
    <StatusBar style='light' />
      {/* <FlatList data={recomendation} keyExtractor={(item) => item} horizontal={true}/> */}
      {places.data ? (
      places.data.slice(4, 7).map((place, index) => (
        <View key={index}>
          {/* <Text>{place.photo}</Text> */}
          <Image style={[styles.Image]} 
        source={{ uri: `${place.photo}` }} />
        </View>
      ))
    ) : (
      <Text>Loading</Text>
    )}
    </View>

    <View style={{flexDirection: 'column'}}>
    {/* <Text >Celebrity</Text> */}
    {places.data ? (
     places.data.slice(4, 7).map((place, index) => (
        <View key={index} style={[styles.newsRight]}>
          <Text style={[styles.categoryNews]}>{place.category.name}</Text>
          <Text style={[styles.tittle]}>{place.name}</Text>
        </View>
      ))
    ) : (
      <Text>Loading</Text>
    )}
    </View>
    </View>

    
    </View>

    {/* for you */}

    {/* <FlatList data={categories}  keyExtractor={(item)=>item} horizontal={true}/> */}
    <View style={[styles.content]}>
    <Text style={[styles.heading]}>For You</Text>
    {/* <ScrollView horizontal={true} style={[styles.categoryRow]}>
      {categories.data ? (
      categories.data.map((categories, index) => (
        <View key={index} style={[styles.category]}>
          <Text style={[styles.categoryText]} >{categories.name}</Text>
        </View>
      ))
    ) : (
      <Text>Loading</Text>
    )}

    </ScrollView> */}
    <View>
            <Text>Category List</Text>
            {category && category.map((item: any) => (
                <Text>{item.name}</Text>
            ))}
        </View>

      {/* <Text style={[styles.categoryText]}>All</Text> */}
      {/* isi berita */}
      <View style={[styles.news]}>
      <View>
    <StatusBar style='light' />
      {/* <FlatList data={recomendation} keyExtractor={(item) => item} horizontal={true}/> */}
      {places.data ? (
      places.data.map((place, index) => (
        <View key={index}>
          {/* <Text>{place.photo}</Text> */}
          <Image style={[styles.Image]} 
        source={{ uri: `${place.photo}` }} />
        </View>
      ))
    ) : (
      <Text>Loading</Text>
    )}
    </View>

    <View style={{flexDirection: 'column'}}>
    {/* <Text >Celebrity</Text> */}
    {places.data ? (
     places.data.map((place, index) => (
        <View key={index} style={[styles.newsRight]}>
          <Text style={[styles.categoryNews]}>{place.category.name}</Text>
          <Text style={[styles.tittle]}>{place.name}</Text>
        </View>
      ))
    ) : (
      <Text>Loading</Text>
    )}
    </View>
    </View>

    
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  
  news: {
    flexDirection: "row",
    
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
    flex: 1, color: '#FFB534', fontWeight: 400, fontSize: 14, marginLeft: 20,verticalAlign:'middle', marginTop: 5
  },

  tittle: {
    flex: 1,
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
    flex: 1, marginTop: 80 , marginLeft: 20,
  },

  heading: {
    color: '#000000', fontWeight: 800, fontSize: 30, 
  },
  category: {
    marginRight: 10,
    // backgroundColor: "blue"
  },
  categoryRow: {
    flex: 1, marginHorizontal: 15,
  },

  categoryText: {
    color: 'white',
    fontWeight: 900,
    fontSize: 15,
    backgroundColor: '#527853',
    // width: 56,
    // height: 30,
    marginTop: 15,
    padding: 7,
    // paddingLeft: 17,
    borderRadius: 7,
    textAlign: "center",
    // justifyContent: "center"
    // flexDirection: "row",
    
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});