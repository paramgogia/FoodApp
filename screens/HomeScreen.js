import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Icon from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const popularDishes = [
  { id: 1, name: 'Pizza', image: 'https://placeholder.com/food1.jpg', price: 12.99 },
  { id: 2, name: 'Burger', image: 'https://placeholder.com/food2.jpg', price: 8.99 },
  { id: 3, name: 'Pasta', image: 'https://placeholder.com/food3.jpg', price: 10.99 },
];

const restaurants = [
  {
    id: 1,
    name: "Mario's Italian",
    rating: 4.5,
    image: 'https://placeholder.com/restaurant1.jpg',
    dishes: [
      { id: 1, name: 'Margherita Pizza', price: 14.99, description: 'Fresh tomato and basil' },
      { id: 2, name: 'Pasta Carbonara', price: 12.99, description: 'Creamy pasta with bacon' },
    ]
  },
  {
    id: 2,
    name: "Burger King",
    rating: 4.2,
    image: 'https://placeholder.com/restaurant2.jpg',
    dishes: [
      { id: 1, name: 'Classic Burger', price: 8.99, description: 'All-beef patty with cheese' },
      { id: 2, name: 'Chicken Wings', price: 10.99, description: 'Spicy buffalo wings' },
    ]
  }
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('Restraunt', { 
      restaurant: restaurant  // Pass the entire restaurant object
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle="dark-content" />
      
      {/* Search Bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height={20} width={20} stroke="gray" />
          <TextInput 
            placeholder="Search restaurants" 
            className="ml-2 flex-1"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Popular Dishes */}
        <View className="mt-4">
          <Text className="px-4 text-xl font-bold">Popular Dishes</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="pt-4"
          >
            {popularDishes.map((dish) => (
              <TouchableOpacity 
                key={dish.id} 
                className="mr-4 ml-4 items-center"
              >
                <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center">
                  <Icon.Coffee height={40} width={40} stroke="gray" />
                </View>
                <Text className="mt-1 text-center">{dish.name}</Text>
                <Text className="text-gray-500">${dish.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Restaurants */}
        <View className="mt-6">
          <Text className="px-4 text-xl font-bold mb-4">Restaurants</Text>
          {restaurants.map((restaurant) => (
            <TouchableOpacity 
              key={restaurant.id}
              className="px-4 mb-4"
              onPress={() => handleRestaurantPress(restaurant)}
            >
              <View className="bg-white rounded-lg shadow-md">
                <View className="h-40 bg-gray-200 rounded-t-lg items-center justify-center">
                  <Icon.Home height={60} width={60} stroke="gray" />
                </View>
                <View className="p-3">
                  <Text className="text-lg font-semibold">{restaurant.name}</Text>
                  <View className="flex-row items-center mt-1">
                    <Icon.Star height={16} width={16} stroke="gold" fill="gold" />
                    <Text className="ml-1 text-gray-500">{restaurant.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;