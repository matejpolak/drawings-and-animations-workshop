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
} from "react-native-reanimated";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const ACTIVE_COLOR = "#f3acac";
const DEFAULT_COLOR = "#6c6b6b";

const WOBBLE_START = "0deg";
const WOBBLE_END = "15deg";

function Heart() {
  const [selected, setSelected] = useState(false);
  const wobble = useSharedValue(WOBBLE_START);

  const styles = useAnimatedStyle(
    () => ({
      transform: [{ rotate: wobble.value }],
    }),
    [wobble]
  );

  const animatedProps = useAnimatedStyle(
    () => ({
      color: withTiming(selected ? ACTIVE_COLOR : DEFAULT_COLOR),
    }),
    [selected]
  );

  useAnimatedReaction(
    () => selected,
    (value) => {
      if (value) {
        wobble.value = withRepeat(
          withSequence(
            withTiming(WOBBLE_END, {
              duration: 50,
            }),
            withTiming(WOBBLE_START, {
              duration: 50,
            })
          ),
          3,
          true
        );
      }
    }
  );

  return (
    <Pressable
      onPress={() => {
        setSelected(!selected);
      }}
    >
      <AnimatedIcon
        name={"favorite"}
        size={50}
        animatedProps={animatedProps}
        style={styles}
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
