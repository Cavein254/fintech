import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
