import React from 'react';　//reactコンポーネント（htmlを使う用）
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// 画面のインポート
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const Stack = createNativeStackNavigator(); // ← ここ超大事！

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Register'>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '会員登録' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'メニュー' }} />
        <Stack.Screen name="Orders" component={OrderHistoryScreen} options={{ title: '注文履歴' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
