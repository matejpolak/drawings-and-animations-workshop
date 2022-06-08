import React, { useState } from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withSpring,
  withSequence,
  useAnimatedReaction,
  withRepeat,
  BounceIn,
  BounceOut,
  ZoomOut,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const ACTIVE_COLOR = "#f3acac";
const DEFAULT_COLOR = "#6c6b6b";

function Heart() {
  const [selected, setSelected] = useState(false);

  const animatedProps = useAnimatedStyle(
    () => ({
      color: withTiming(selected ? ACTIVE_COLOR : DEFAULT_COLOR),
    }),
    [selected]
  );

  return (
    <Pressable
      onPress={() => {
        setSelected(!selected);
      }}
    >
      <AnimatedIcon
        key={`Animated-${selected}`}
        entering={BounceIn}
        exiting={ZoomOut}
        name={"favorite"}
        size={50}
        animatedProps={animatedProps}
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
