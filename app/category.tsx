import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const category = () => {
  return (
    <View>
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
  )
}

export default category

const styles = StyleSheet.create({})