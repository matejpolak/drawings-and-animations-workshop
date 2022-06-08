import type { ComponentProps } from "react";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import Animated, {
  BounceIn,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomOut,
} from "react-native-reanimated";
import type { ColorValue } from "react-native";
import { Pressable, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const WIDTH = 50;
const STICKERS_COUNT = 4;

function snapPoint(x: number) {
  "worklet";
  const position = Math.max(
    -STICKERS_COUNT + 1,
    Math.min(0, Math.round(x / WIDTH))
  );
  return position * WIDTH;
}

function Sticker({
  iconName,
  color,
}: {
  iconName: ComponentProps<typeof Icon>["name"];
  color: ColorValue;
}) {
  const [selected, setSelected] = useState(false);

  return (
    <Pressable
      onPress={() => {
        setSelected(!selected);
      }}
    >
      <AnimatedIcon
        key={`Sticker-${selected}`}
        entering={BounceIn}
        exiting={ZoomOut}
        name={iconName}
        color={selected ? color : "#838181"}
        size={50}
      />
    </Pressable>
  );
}

function Toolbar() {
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((e) => {
      offset.value += e.changeX;
    })
    .onEnd((e) => {
      offset.value = withSpring(snapPoint(offset.value));
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  return (
    <View
      style={{
        overflow: "visible",
        width: 0,
      }}
    >
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            { flexDirection: "row", width: WIDTH * 4, marginLeft: -WIDTH / 2 },
            style,
          ]}
        >
          <Sticker iconName="favorite" color="#ffaaa8" />
          <Sticker iconName="grade" color="#001a72" />
          <Sticker iconName="thumb-up" color="#ffee86" />
          <Sticker iconName="emoji-events" color="#8ed3ef" />
        </Animated.View>
      </GestureDetector>
      <Icon
        name={"expand-less"}
        size={30}
        color={"#000"}
        style={{ position: "absolute", bottom: -30, left: -15 }}
      />
    </View>
  );
}

export function GestureBasedPicker() {
  return (
    <CenterScreen>
      <Toolbar />
    </CenterScreen>
  );
}
