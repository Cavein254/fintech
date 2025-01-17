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
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSignIn } from "@clerk/clerk-expo";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}
const Page = () => {
  const [password, setPassword] = React.useState("");
  const [emailAddress, SetEmailAddress] = React.useState("");
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const onSignIn = React.useCallback(
    async (type: SignInType) => {
      if (type === SignInType.Email) {
        try {
          const signInAttempt = await signIn!.create({
            identifier: emailAddress,
            password,
          });

          if (signInAttempt!.status === "complete") {
            await setActive!({ session: signInAttempt.createdSessionId });
            router.push({
              pathname: "/verify/[email]",
              params: { email: emailAddress, signin: "true" },
            });
          } else {
            console.error(JSON.stringify(signInAttempt, null, 2));
          }
        } catch (err) {
          console.error(JSON.stringify(err, null, 2));
        }
      }
    },
    [isLoaded, emailAddress, password]
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome Back!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input]}
            placeholderTextColor={Colors.gray}
            placeholder="Mobile Number"
            keyboardType="numeric"
            value={emailAddress}
            onChangeText={(text) => SetEmailAddress(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Country Code"
            placeholderTextColor={Colors.gray}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            emailAddress !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.lightGray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.lightGray,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="mail" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-google" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-apple" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
