import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/styles";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Page = () => {
  const [countryCode, setCountryCode] = React.useState("+254");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const onSignup = async () => {};
  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>Let's get started!</Text>
          <Text style={defaultStyles.descriptionText}>
            Enter your phone number. We will send you a confirmation code there
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Country Code"
              placeholderTextColor={Colors.gray}
              value={countryCode}
              onChangeText={(text) => setCountryCode(text)}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholderTextColor={Colors.gray}
              placeholder="Mobile Number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          <Link href="/login" replace asChild>
            <TouchableOpacity>
              <Text style={defaultStyles.textLink}>
                Already have an account? Log In
              </Text>
            </TouchableOpacity>
          </Link>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              phoneNumber !== "" ? styles.enabled : styles.disabled,
            ]}
            onPress={onSignup}
          >
            <Text style={defaultStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Page;
