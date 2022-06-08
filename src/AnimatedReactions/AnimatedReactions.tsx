import React, { useState } from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
  ZoomOut,
  Keyframe,
  ZoomIn,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

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

function Heart() {
  const [selected, setSelected] = useState(false);

  return (
    <Pressable
      onPress={() => {
        setSelected(!selected);
      }}
    >
      <AnimatedIcon
        key={`Animated-${selected}`}
        entering={selected ? keyframe.duration(300) : ZoomIn}
        exiting={ZoomOut}
        name={"favorite"}
        size={50}
        color={selected ? ACTIVE_COLOR : DEFAULT_COLOR}
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
