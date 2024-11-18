import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import OrderPlacementScreen from './screens/OrderPlacement';
// import OrderTrackingScreen from './screens/OrderTracking';
import RestrauntScreen from './screens/RestrauntScreen';
export default function Navigation(){
    return(
            <Stack.Navigator screenOptions={
                {
                    headerShown:false
                }
            }>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Restraunt" component={RestrauntScreen} />
                <Stack.Screen name="OrderPlacementScreen" component={OrderPlacementScreen} />
                 {/* <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />  */}
            </Stack.Navigator>
       
    )
}