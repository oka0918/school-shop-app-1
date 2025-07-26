import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !grade || !classNumber || !password) {
      Alert.alert('エラー', 'すべての項目を入力してください');
      return;
    }

    // 自動でメールアドレスを生成（例: 1-3-taro@school.jp）
    const email = `${grade}-${classNumber}-${name}@school.jp`;

    try {
      console.log("メールで登録開始");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("登録成功:", userCredential.user.uid);
      
      await AsyncStorage.setItem('userInfo', JSON.stringify({ name, grade, class: classNumber }));

      // Firestoreに保存
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        grade,
        class: classNumber,
        email,
        createdAt: new Date(),
      });
    
      console.log("Firestoreに保存完了");
      Alert.alert("登録完了", "ようこそ！");
      navigation.navigate('Main'); // ← ここに来てないなら止まってる！
    
    } catch (error) {
      console.error("登録エラー:", error);
      Alert.alert("登録エラー", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>会員登録</Text>
      <TextInput label="名前" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="学年" value={grade} onChangeText={setGrade} keyboardType="numeric" style={styles.input} />
      <TextInput label="クラス" value={classNumber} onChangeText={setClassNumber} keyboardType="numeric" style={styles.input} />
      <TextInput label="パスワード" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={handleRegister}>登録する</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }
});

export default RegisterScreen;
