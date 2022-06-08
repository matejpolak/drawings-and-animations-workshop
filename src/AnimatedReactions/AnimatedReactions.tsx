import React from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const ACTIVE_COLOR = "#f3acac";
const DEFAULT_COLOR = "#6c6b6b";

function Heart() {
  const scale = useSharedValue(1);
  const color = useSharedValue(DEFAULT_COLOR);

  const styles = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [scale]
  );

  const animatedProps = useAnimatedStyle(
    () => ({
      color: color.value,
    }),
    [color]
  );

  return (
    <Pressable
      onPress={() => {
        // Easing
        // scale.value = withTiming(scale.value + 0.5, {
        //   duration: 1000,
        //   easing: Easing.ease,
        // });

        // Spring
        // scale.value = withSpring(scale.value + 0.5, {
        //   damping: 3,
        // });

        // Sequence
        scale.value = withSequence(withSpring(2), withSpring(1));

        // Color
        color.value = withSequence(
          withTiming(ACTIVE_COLOR),
          withTiming(DEFAULT_COLOR)
        );
      }}
    >
      <AnimatedIcon
        name={"favorite"}
        size={50}
        style={styles}
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
