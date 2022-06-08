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

import { CenterScreen } from "../components/CenterScreen";

function Heart() {
  const scale = useSharedValue(1);

  const styles = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [scale]
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
      }}
    >
      <Animated.View
        style={[{ width: 50, height: 50, backgroundColor: "#ffaaa8" }, styles]}
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
