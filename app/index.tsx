import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { useVideoPlayer, VideoView } from "expo-video";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/styles";
import Colors from "@/constants/Colors";

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);
  const videoSource = assets ? assets[0]?.uri : "";
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
    player.playing;
  });
  return (
    <View style={styles.container}>
      {assets && (
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="cover"
          nativeControls={false}
        />
      )}
      <View style={{ padding: 20 }}>
        <Text style={styles.header}>Welcome to the App!</Text>
      </View>
      <View style={styles.buttons}>
        <Link
          href="/login"
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, fontWeight: 500 }}>
              Log In
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href="/signup"
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "#fff" },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: 500 }}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 36,
    fontWeight: 900,
    color: "white",
    textTransform: "uppercase",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});

export default Page;
