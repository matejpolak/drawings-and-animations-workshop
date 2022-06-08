import React, { useEffect, useState } from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
  ZoomOut,
  Keyframe,
  ZoomIn,
  useSharedValue,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useTiming } from "@shopify/react-native-skia";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const ACTIVE_COLOR = "#f3acac";
const DEFAULT_COLOR = "#6c6b6b";

const keyframe = new Keyframe({
  0: {
    transform: [
      { rotate: "0deg" },
      {
        scale: 0.5,
      },
    ],
  },
  33: {
    transform: [
      { rotate: "-15deg" },
      {
        scale: 1.25,
      },
    ],
  },
  66: {
    transform: [
      { rotate: "15deg" },
      {
        scale: 1.5,
      },
    ],
  },
  100: {
    transform: [
      { rotate: "0deg" },
      {
        scale: 1,
      },
    ],
  },
});

const VX = 30;
const VY = 50;
const G = 10;
const DURATION_SECONDS = 10;

function Heart() {
  const time = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    const t = time.value / 1000;
    const x = VX * t;
    const y = VY * t + (-G * t * t) / 2;
    return {
      transform: [
        {
          translateX: x,
        },
        {
          translateY: -y,
        },
      ],
    };
  }, [time]);

  return (
    <Pressable
      onPress={() => {
        time.value = withTiming(DURATION_SECONDS * 1000, {
          duration: DURATION_SECONDS * 1000,
        });
      }}
    >
      <AnimatedIcon
        name={"favorite"}
        size={50}
        color={DEFAULT_COLOR}
        style={style}
      />
    </Pressable>
  );
}

export function AnimatedReactions() {
  return (
    <CenterScreen>
      <Heart />
    </CenterScreen>
  );
}
