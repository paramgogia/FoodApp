import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from 'react-native-feather';

const OrderPlacementScreen = ({ route, navigation }) => {
  const { selectedDishes, totalPrice } = route.params || { selectedDishes: [], totalPrice: 0 };
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePlaceOrder = () => {
    // Here you would typically make an API call to place the order
    navigation.navigate('OrderTracking', {
      orderId: Math.random().toString(36).substring(7),
      estimatedTime: '30-45 minutes'
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4">
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={() => navigation.goBack()}
        >
          <Icon.ArrowLeft height={20} width={20} stroke="black" />
          <Text className="ml-2">Back to Restaurant</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-6">
        <Text className="text-2xl font-bold mb-6">Order Summary</Text>

        {/* Order Items */}
        {selectedDishes.map((dish, index) => (
          <View key={index} className="flex-row justify-between mb-4">
            <Text>{dish.name}</Text>
            <Text>${dish.price.toFixed(2)}</Text>
          </View>
        ))}

        <View className="h-px bg-gray-200 my-4" />

        {/* Total */}
        <View className="flex-row justify-between mb-6">
          <Text className="font-bold">Total Amount</Text>
          <Text className="font-bold">${totalPrice}</Text>
        </View>

        {/* Delivery Information */}
        <Text className="text-xl font-bold mb-4">Delivery Information</Text>
        <View className="space-y-4">
          <View>
            <Text className="text-gray-600 mb-2">Delivery Address</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your delivery address"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Phone Number</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          {/* Payment Method Selection */}
          <View>
            <Text className="text-gray-600 mb-2">Payment Method</Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity
                className={`flex-1 p-3 rounded-lg border ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onPress={() => setPaymentMethod('card')}
              >
                <Text className={paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-600'}>
                  Credit Card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 p-3 rounded-lg border ${
                  paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onPress={() => setPaymentMethod('cash')}
              >
                <Text className={paymentMethod === 'cash' ? 'text-blue-500' : 'text-gray-600'}>
                  Cash on Delivery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View className="p-4 bg-white shadow-lg">
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={handlePlaceOrder}
        >
          <Text className="text-white text-center font-bold text-lg">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderPlacementScreen;
