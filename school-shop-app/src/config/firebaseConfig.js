// firebaseの機能を使うために関数をインポート
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


//firebaseのプロジェクトの設定情報
const firebaseConfig = {
  apiKey: "AIzaSyA6gPe7MFyjzELtHV3ftG0UAiT4XDxUIkg",
  authDomain: "school-shop-app.firebaseapp.com",
  projectId: "school-shop-app",
  storageBucket: "school-shop-app.firebasestorage.app",
  messagingSenderId: "869591043834",
  appId: "1:869591043834:web:4a3dbef0d5e5a5b576c343",
};

//firebaseアプリの初期化用　すでに初期化済みならそれを使う
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

//firebaseのログインなどの認証機能を使えるようにする
const auth = getAuth(app);

//firestore（クラウドデータベース）を使えるようにする
const db = getFirestore(app);

//ほかのファイルで使えるようにauthとdbを外部公開する
export { auth, db };
