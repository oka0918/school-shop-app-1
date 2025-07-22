import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useCart } from '../contexts/CartContext';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function CartIconWithBadge({ color, size }) {
  const { state } = useCart();
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <View>
      <Ionicons name="cart-outline" size={size} color={color} />
      {count > 0 && (
        <View style={{
          position: 'absolute',
          right: -6,
          top: -3,
          backgroundColor: 'red',
          borderRadius: 8,
          width: 16,
          height: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'white', fontSize: 10 }}>{count}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabNavigator() {
  return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return <Ionicons name="home-outline" size={size} color={color} />;
            } else if (route.name === 'Menu') {
              return <Ionicons name="fast-food-outline" size={size} color={color} />;
            } else if (route.name === 'Cart') {
              return <CartIconWithBadge color={color} size={size} />;
            } else if (route.name === 'Settings') {
              return <Ionicons name="settings-outline" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'ホーム' }} />
        <Tab.Screen name="Menu" component={MenuScreen} options={{ title: 'メニュー' }} />
        <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'カート' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: '設定' }} />
        

      </Tab.Navigator>
    
  );
}