import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCrsBHji8SmH4dZVRLcHInRxFEmzrKx3Wo",
  authDomain: "cacao-test.firebaseapp.com",
  databaseURL: "https://cacao-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cacao-test",
  storageBucket: "cacao-test.appspot.com",
  messagingSenderId: "423532869885",
  appId: "1:423532869885:web:2a103afd6f51672af1e694"
  // apiKey: "AIzaSyBI_9-g1KPt5vPTsQd8wD9KFubQe7pon18",
  // authDomain: "test-47314.firebaseapp.com",
  // databaseURL: "https://test-47314-default-rtdb.firebaseio.com",
  // projectId: "test-47314",
  // storageBucket: "test-47314.appspot.com",
  // messagingSenderId: "663872254872",
  // appId: "1:663872254872:web:719597f9089018346871ed",
  // measurementId: "G-GS2VXTNREH"
};

const app = initializeApp(firebaseConfig);
export default app;