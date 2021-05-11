import firebase from "firebase/app";
import "firebase/firestore";

import { CreatePlugin as PluginFirestore } from "@magnetarjs/plugin-firestore";
import { CreatePlugin as PluginVue } from "@magnetarjs/plugin-vue2";
import { Magnetar } from "magnetar";
import { logger } from "@magnetarjs/utils";

import vue from "vue";

firebase.initializeApp({
  apiKey: "AIzaSyDdJ1RzuARDXok2dUli97b2ohGNjfgm5jA",
  authDomain: "magnetar-todos.firebaseapp.com",
  projectId: "magnetar-todos",
  storageBucket: "magnetar-todos.appspot.com",
  messagingSenderId: "305920844386",
  appId: "1:305920844386:web:57fd4c48abfc35c5f9673b",
});

const remote = PluginFirestore({
  firebaseInstance: firebase,
  useModulePathsForFirestore: true,
});
const generateRandomId = () =>
  firebase.firestore().collection("random").doc().id;
const local = PluginVue({ vueInstance: vue, generateRandomId });

export const magnetar = Magnetar({
  stores: { local, remote },
  localStoreName: "local",
  executionOrder: {
    read: ["local", "remote"],
    write: ["local", "remote"],
    delete: ["local", "remote"],
  },
  on: { success: logger },
});
