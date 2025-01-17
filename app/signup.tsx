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
import { useSignUp } from "@clerk/clerk-expo";

const Page = () => {
  const [password, setPassword] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const onSignup = async () => {
    if (!isLoaded) return;
    try {
      await signUp!.create({
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push({
        pathname: "/verify/[email]",
        params: { email: emailAddress },
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your Email Address. We will send you a confirmation code there
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input]}
            placeholderTextColor={Colors.gray}
            placeholder="Email Address"
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={(text) => setEmailAddress(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor={Colors.gray}
            keyboardType="visible-password"
            value={password}
            onChangeText={(text) => setPassword(text)}
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
            emailAddress !== "" ? styles.enabled : styles.disabled,
          ]}
          onPress={onSignup}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
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
