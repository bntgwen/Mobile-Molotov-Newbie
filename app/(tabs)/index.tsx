import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";


export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
      router.replace("/login");
    } catch (error: any) {
      console.error("LOGOUT ERROR:", error);
      alert("❌ " + error.code + " - " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Welcome to Home</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: "tomato", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16 },
});