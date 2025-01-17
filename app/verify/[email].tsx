import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/styles";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

const Page = () => {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const { email, signin } = useLocalSearchParams<{
    email: string;
    signin?: string;
  }>();
  const [code, setCode] = React.useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  React.useEffect(() => {
    if (code.length === 6) {
      console.log(`length ${code.length}`);
      if (signin === "true") {
        console.log(`signIn ${signin}`);

        verifySignIn();
      } else {
        console.log(`signup ${signin}`);

        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp!.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive!({ session: signUpAttempt.createdSessionId });
        router.replace("/login");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });
      await setActive!({ session: signIn!.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {email} unless you already have an account
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Link href="/login" replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>
            Already have an account? Log In
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

export default Page;
