import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { auth, db } from '../config/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
  const { state, dispatch } = useCart();
  const [userInfo, setUserInfo] = useState(null);

  // ユーザー情報をSecureStoreから読み込む
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('userInfo');
        if (stored) setUserInfo(JSON.parse(stored));
      } catch (e) {
        console.error('ユーザー情報取得エラー:', e);
      }
    })();
  }, []);

  const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = async () => {
    // ユーザー情報と認証確認
    if (!userInfo) {
      Alert.alert('エラー', 'ユーザー情報がありません');
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('エラー', 'ログイン状態を確認してください');
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        name: userInfo.name,
        grade: userInfo.grade,
        class: userInfo.class,
        items: state.items,
        total,
        orderedAt: Timestamp.now(),
      };
      // Firestoreに注文データを追加
      await addDoc(collection(db, 'orders'), orderData);
      Alert.alert('注文完了', 'ご注文ありがとうございました！');
      // カートをクリア
      dispatch({ type: 'CLEAR' });
    } catch (error) {
      console.error('Firestore書き込みエラー:', error);
      Alert.alert('エラー', '注文データの送信に失敗しました');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name} × {item.quantity}</Text>
      <View style={styles.controls}>
        <Button
          title="＋"
          onPress={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity + 1 })}
        />
        <Button
          title="－"
          onPress={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity - 1 })}
        />
        <Button
          title="削除"
          onPress={() => dispatch({ type: 'REMOVE', id: item.id })}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>カートが空です</Text>}
      />
      <Text style={styles.total}>合計: ¥{total}</Text>
      <Button
        title="注文を確定する"
        onPress={handleCheckout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { marginBottom: 12 },
  controls: { flexDirection: 'row', marginTop: 4, justifyContent: 'space-between', width: 200 },
  total: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
});
