import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Icon from 'react-native-feather';

const RestrauntScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurant } = route.params || {}; // Safely access params

  const [selectedDishes, setSelectedDishes] = useState([]);

  // Safely handle undefined restaurant
  if (!restaurant) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Text>Restaurant not found</Text>
      </SafeAreaView>
    );
  }

  const addToCart = (dish) => {
    setSelectedDishes([...selectedDishes, dish]);
  };

  const getTotalPrice = () => {
    return selectedDishes.reduce((total, dish) => total + dish.price, 0).toFixed(2);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="relative">
      <TouchableOpacity 
          className="flex-row items-center"
          onPress={() => navigation.goBack()}
        >
          <Icon.ArrowLeft height={20} width={20} stroke="black" />
          <Text className="ml-2">Back to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Restaurant Info */}
      <View className="px-4 pt-14">
        <Text className="text-3xl font-bold">{restaurant.name}</Text>
        <View className="flex-row items-center mt-2">
          <Icon.Star height={16} width={16} stroke="gold" fill="gold" />
          <Text className="ml-1">{restaurant.rating}</Text>
        </View>
      </View>

      {/* Menu */}
      <ScrollView className="flex-1 px-4 pt-6">
        <Text className="text-xl font-bold mb-4">Menu</Text>
        {restaurant.dishes.map((dish) => (
          <View key={dish.id} className="flex-row justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-sm">
            <View className="flex-1">
              <Text className="text-lg font-semibold">{dish.name}</Text>
              <Text className="text-gray-500 mt-1">{dish.description}</Text>
              <Text className="text-gray-900 mt-2">${dish.price}</Text>
            </View>
            <TouchableOpacity 
              className="bg-blue-500 py-2 px-4 rounded-full"
              onPress={() => addToCart(dish)}
            >
              <Text className="text-white">Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Cart Summary */}
      {selectedDishes.length > 0 && (
        <View className="px-4 py-4 bg-white shadow-lg">
          <View className="bg-blue-500 p-4 rounded-lg">
            <View className="flex-row justify-between items-center">
              <Text className="text-white font-bold">
                {selectedDishes.length} items selected
              </Text>
              <Text className="text-white font-bold">
                Total: ${getTotalPrice()}
              </Text>
              <TouchableOpacity 
  className="bg-blue-500 p-4 rounded-lg"
  onPress={() => navigation.navigate('OrderPlacementScreen', {
    selectedDishes,
    totalPrice: getTotalPrice()
  })}
>
  <Text className="text-white text-center font-bold">Proceed to Checkout</Text>
</TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RestrauntScreen;