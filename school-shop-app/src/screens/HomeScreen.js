import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, Avatar } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* ユーザーの挨拶 */}
      <View style={styles.header}>
        <Text style={styles.greeting}>購買アプリへようこそ</Text>
      </View>

      {/* 注文ボタン */}
      <Button mode="contained" style={styles.orderButton} onPress={() => navigation.navigate('Menu')}>
        🛒 すぐに注文する
      </Button>

      {/* おすすめ商品 */}
      <Text style={styles.sectionTitle}>🔥 おすすめ商品</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://via.placeholder.com/150' }} />
          <Card.Content>
            <Text>唐揚げ弁当</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://via.placeholder.com/150' }} />
          <Card.Content>
            <Text>ノート</Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* 注文履歴へのアクセス */}
      <Text style={styles.sectionTitle}>📅 注文履歴</Text>
      <Button mode="outlined" onPress={() => navigation.navigate('Orders')}>
        注文履歴を見る
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  greeting: { marginLeft: 10, fontSize: 18, fontWeight: 'bold' },
  orderButton: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  card: { width: 150, marginRight: 10 },
});

export default HomeScreen;
