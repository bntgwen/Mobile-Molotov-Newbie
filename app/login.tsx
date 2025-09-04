import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Animated values for inputs
  const emailAnim = useRef(new Animated.Value(0)).current; // 0 = unfocused, 1 = focused
  const passwordAnim = useRef(new Animated.Value(0)).current;

  // Animated value for button press
  const buttonScale = useRef(new Animated.Value(1)).current;

  const animateFocus = (anim: Animated.Value, toValue: number) => {
    Animated.timing(anim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login sukses!");
      router.replace("/"); // redirect ke Home
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);
      alert("❌ " + error.code + " - " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Interpolate border color from animated value (monochrome shades)
  const emailBorderColor = emailAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#888", "#000"],
  });

  const passwordBorderColor = passwordAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#888", "#000"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Animated.View style={[styles.inputContainer, { borderColor: emailBorderColor }]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          onFocus={() => animateFocus(emailAnim, 1)}
          onBlur={() => animateFocus(emailAnim, 0)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />
      </Animated.View>

      <Animated.View style={[styles.inputContainer, { borderColor: passwordBorderColor }]}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={() => animateFocus(passwordAnim, 1)}
          onBlur={() => animateFocus(passwordAnim, 0)}
          textContentType="password"
        />
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: buttonScale }], width: "100%" }}>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          activeOpacity={0.8}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      <Link href="/register" style={styles.link}>
        Don’t have an account? Register
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: "700",
    color: "#000",
  },
  inputContainer: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
    color: "#444",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});