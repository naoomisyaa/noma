import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, FlatList, ImageBackground, Button, Pressable,  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {

  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainData, setMainData] = useState({ places: [], categories: [] });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();
  const navigation= useNavigation();
  

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const handlePlacePress = (placeId) => {
    router.push(`/detail/${placeId}`);
  };

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
    setPlaces(placesData);
 
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        {/* header */}
      <View>
        <View style={styles.header}>
            <Text style={styles.text}><Image source={require("@/assets/images/logo.png")} style={styles.image}/>  noma</Text>
        </View>
        <View style={{alignItems: 'center'}}>
    </View>
    </View>

    {/* for you */}
    <View style={[styles.content]}>
    <Text style={[styles.heading]}>Category</Text>

    <GestureHandlerRootView style={{ flex: 1 }}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={[styles.placeRow]}>
  {categories.data ? (
    categories.data.map((category, index) => (
      <View
        key={index}
        style={[
          styles.category,
          selectedCategory === category.name ? styles.selectedCategoryButton : null,
        ]}
      >
        <TouchableOpacity onPress={() => handleCategoryPress(category.name)}>
          <Text style={[styles.categoryText]}>{category.name}</Text>
        </TouchableOpacity>
      </View>
    ))
  ) : (
    <Text>Loading</Text>
  )}
</ScrollView>
</GestureHandlerRootView>
</View>

  <View style={[styles.content]}>
      <View style={[styles.news]}>
         {/* search bar */}
      {/* <Search/> */}
  <View>
    <StatusBar style='light' />
    {places.data ? (
      places.data
        .filter((place) => selectedCategory === null || place.category.name === selectedCategory)
        .map((place, index) => (
          <GestureHandlerRootView style={{ flex: 1 }}>
           <TouchableOpacity key={index} onPress={() => router.push(`/place/${place.slug}`)}>
                      <Image style={[styles.Image]} source={{ uri: `${place.photo}` }} />
                    </TouchableOpacity>
                    </GestureHandlerRootView>
        ))
    ) : (
      <Text>Loading</Text>
    )}
  </View>

  <View style={{ flexDirection: 'column' }}>
    {places.data ? (
      places.data
        .filter((place) => selectedCategory === null || place.category.name === selectedCategory)
        .map((place, index) => (
          <GestureHandlerRootView style={{ flex: 1 }}>
          <TouchableOpacity key={index} onPress={() => router.push(`/place/${place.slug}`)}>
          <View key={index} style={[styles.newsRight]}>
            <Text style={[styles.categoryNews]}>{place.category.name}</Text>
            <Text style={[styles.tittle]}>{place.name}</Text>
          </View>
          </TouchableOpacity>
          </GestureHandlerRootView>
        ))
    ) : (
      <Text>Loading</Text>
    )}
  </View>
</View>
</View>

<View style={[styles.content]}>
<Text style={[styles.heading]}>Recomendation</Text>
    {/* <Text style={{color: '#FFB534', fontWeight: 400, fontSize: 14, marginLeft: 270, marginBottom: 10}}>View All</Text> */}

    {/* isi berita */}
    <View style={[styles.news]}>
      <View>
    <StatusBar style='light' />
      {/* <FlatList data={recomendation} keyExtractor={(item) => item} horizontal={true}/> */}
      {places.data ? (
      places.data.slice(3, 8).map((place, index) => (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TouchableOpacity key={index} onPress={() => router.push(`/place/${place.slug}`)}>
        <View key={index}>
          {/* <Text>{place.photo}</Text> */}
          <Image style={[styles.Image]} 
        source={{ uri: `${place.photo}` }} />
        </View>
        {/* </TouchableOpacity> */}
        </TouchableOpacity>
        </GestureHandlerRootView>
      ))
    ) : (
      <Text>Loading</Text>
    )}
    </View>

    <View style={{flexDirection: 'column'}}>
    {/* <Text >Celebrity</Text> */}
    {places.data ? (
     places.data.slice(3, 8).map((place, index) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableOpacity key={index} onPress={() => router.push(`/place/${place.slug}`)}>
        <View key={index} style={[styles.newsRight]}>
          <Text style={[styles.categoryNews]}>{place.category.name}</Text>
          <Text style={[styles.tittle]}>{place.name}</Text>
        </View>
        </TouchableOpacity>
        </GestureHandlerRootView>
      ))
    ) : (
      <Text>Loading</Text>
    )}
    </View>
    </View>
    </View>

    
    {/* </View>/ */}
    {/* <Stack.Screen name='view-detail' component={detail}/> */}
    {/* </View> */}
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
    flex: 1, marginTop: 30 , marginLeft: 20, 
  },

  heading: {
    color: '#000000', fontWeight: 800, fontSize: 30, marginBottom: 20,
  },
  category: {
    marginRight: 10,
    // backgroundColor: "blue"
  },
  categoryRow: {
    flex: 1, marginHorizontal: 15,
  },

  categoryText: {
    color: '#527853',
    fontWeight: 900,
    fontSize: 15,
    backgroundColor: '#F3F3F3',
    marginTop: 7,
    padding: 7,
    borderRadius: 7,
    textAlign: "center",
    borderColor: '#527853',
    borderWidth: 2,
    
    },
    selectedCategoryButton: {
    color: 'white',
    fontWeight: 900,
    fontSize: 15,
    backgroundColor: '#527853',
    borderRadius: 7,
    textAlign: "center",
    },
    item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    },
    title: {
    fontSize: 32,
    }, 
    header: {
      display: 'flex', alignItems: 'flex-start', padding: 10, marginLeft: 20, marginTop: 40
  },
  image: {
      width:  30, height: 30, marginLeft: 20,
  },
  text: {
      fontSize: 23, color: '#527853', fontWeight: '900', margin: 0
  },
  view:{
    marginTop: 10
    },
    row:{
      alignItems: 'center', shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: 'white', 
      borderRadius: 10,
      marginHorizontal:10, marginVertical:10, marginBottom:20
      
    },
    namePlace:{
      color: 'black', fontWeight: 'bold', fontSize:14, position: 'absolute', marginTop: 198
    },
    placeRow:{
      marginLeft:10
     },
     imageCarousel: {
     width:260, height:180, marginHorizontal:10, borderRadius: 4, marginTop: 10, marginBottom: 40,  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3, },shadowOpacity: 0.27,shadowRadius: 4.65, elevation: 6,
     }
    }); 