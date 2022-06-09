import type { Component, ComponentProps } from "react";
import React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { ColorValue } from "react-native";
import { View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const WIDTH = 50;
const STICKERS_COUNT = 4;

function snapPoint(x: number, vx: number) {
  "worklet";
  const simulatedX = x + vx * 0.1;
  const position = Math.max(
    -STICKERS_COUNT + 1,
    Math.min(0, Math.round(simulatedX / WIDTH))
  );
  return position * WIDTH;
}

export function Sticker({
  iconName,
  color,
  onPress,
}: {
  iconName: ComponentProps<typeof Icon>["name"];
  color: ColorValue;
  onPress?: (
    iconName: ComponentProps<typeof Icon>["name"],
    color: ColorValue,
    size: number
  ) => void;
}) {
  const scale = useSharedValue(1);
  const ref = useAnimatedRef();

  function addItemFromUI() {
    "worklet";
    const { width } = measure(ref);
    if (onPress) {
      runOnJS(onPress)(iconName, color, width);
    }
  }

  const tap = Gesture.Tap().onEnd(() => {
    addItemFromUI();
  });

  const longPress = Gesture.Tap()
    .maxDuration(1e8)
    .onBegin(() => {
      scale.value = withTiming(3, {
        duration: 2000,
      });
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      addItemFromUI();
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    zIndex: scale.value > 1 ? 100 : 1,
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(tap, longPress)}>
      <AnimatedIcon
        ref={ref}
        name={iconName}
        color={color}
        size={50}
        style={style}
      />
    </GestureDetector>
  );
}

export function Toolbar({
  onItemPress,
}: {
  onItemPress?: (
    iconName: ComponentProps<typeof Icon>["name"],
    color: ColorValue,
    size: number
  ) => void;
}) {
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((e) => {
      offset.value += e.changeX;
    })
    .onEnd((e) => {
      offset.value = withSpring(snapPoint(offset.value, e.velocityX), {
        velocity: e.velocityX,
      });
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
          <Sticker iconName="favorite" color="#ffaaa8" onPress={onItemPress} />
          <Sticker iconName="grade" color="#001a72" onPress={onItemPress} />
          <Sticker iconName="thumb-up" color="#ffee86" onPress={onItemPress} />
          <Sticker
            iconName="emoji-events"
            color="#8ed3ef"
            onPress={onItemPress}
          />
        </Animated.View>
      </GestureDetector>
      <Icon
        name={"expand-less"}
        size={30}
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
