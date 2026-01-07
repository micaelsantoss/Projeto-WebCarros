import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDa0K6C6n6TvgIGumorIk3-Eeri5ZDuzI8",
  authDomain: "projeto-webcarros-c5b70.firebaseapp.com",
  projectId: "projeto-webcarros-c5b70",
  storageBucket: "projeto-webcarros-c5b70.firebasestorage.app",
  messagingSenderId: "1007680096186",
  appId: "1:1007680096186:web:4f42ddd60e19f274b47f83"
};

export const app = initializeApp(firebaseConfig);