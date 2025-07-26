import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { useCart } from '../contexts/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bentoProducts = [
  { id: '1', name: '唐揚げ弁当', price: 500, category: 'お弁当', image: require('../../assets/唐揚げ弁当.jpg') },
  { id: '2', name: 'ハンバーグ弁当', price: 550, category: 'お弁当', image: require('../../assets/ハンバーグ弁当.jpg') },
];
const goodsProducts = [
  { id: '3', name: 'ノート', price: 200, category: '雑貨', image: require('../../assets/ノート.jpg') },
  { id: '4', name: 'ボールペン', price: 150, category: '雑貨', image: require('../../assets/ボールペン.jpg') },
];

export default function MenuScreen() {
  const [category, setCategory] = useState('お弁当');
  const { dispatch } = useCart();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('userInfo');
      if (stored) setUserInfo(JSON.parse(stored));
    })();
  }, []);

  const handleOrder = (item) => {
    if (!userInfo) {
      Alert.alert('エラー', 'ユーザー情報がありません');
      return;
    }
    dispatch({ type: 'ADD', item: { ...item, quantity: 1 } });
    Alert.alert('カート追加', `${item.name} をカートに追加しました`);
  };

  const products = category === 'お弁当' ? bentoProducts : goodsProducts;

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Chip selected={category === 'お弁当'} onPress={() => setCategory('お弁当')} style={styles.chip}>お弁当</Chip>
        <Chip selected={category === '雑貨'} onPress={() => setCategory('雑貨')} style={styles.chip}>雑貨</Chip>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.shadowWrapper}>
            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Card.Content>
                  <Title style={styles.title}>{item.name}</Title>
                  <Paragraph style={styles.price}>¥{item.price}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button mode="contained" onPress={() => handleOrder(item)}>注文</Button>
                </Card.Actions>
              </Card>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  categoryContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  chip: { marginHorizontal: 5 },
  shadowWrapper: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 6, borderRadius: 15, marginBottom: 15, backgroundColor: 'transparent' },
  cardContainer: { borderRadius: 15, overflow: 'hidden', backgroundColor: '#fff' },
  card: { borderRadius: 15 },
  image: { width: '100%', height: 150, resizeMode: 'cover' },
  title: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'gray' },
});
