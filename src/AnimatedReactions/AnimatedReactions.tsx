import React, { useEffect, useState } from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  ZoomOut,
  BounceIn,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const DEFAULT_COLOR = "#6c6b6b";
const ACTIVE_COLOR = "#ffaaa8";

const VX_MAX = 35;
const VY_MAX = 80;
const G = 15;
const DURATION_SECONDS = 30;

const getRandomPhysics = () => ({
  VX: Math.random() * 2 * VX_MAX - VX_MAX,
  VY: Math.random() * VY_MAX,
});

function FlyingHeart() {
  const time = useSharedValue(0);
  const { VX, VY } = getRandomPhysics();

  useEffect(() => {
    time.value = withTiming(DURATION_SECONDS * 1000, {
      duration: (DURATION_SECONDS * 1000) / 10,
    });
  }, []);

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
  }, []);

  return (
    <AnimatedIcon
      name={"favorite"}
      size={50}
      color={ACTIVE_COLOR}
      style={[{ position: "absolute" }, style]}
    />
  );
}

function ExplodingHearts({ count }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <FlyingHeart key={index} />
      ))}
    </>
  );
}

function Heart() {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <Pressable onPress={() => setSelected(!selected)}>
        <AnimatedIcon
          key={selected ? 1 : 0}
          name="favorite"
          size={50}
          color={selected ? ACTIVE_COLOR : DEFAULT_COLOR}
          exiting={ZoomOut}
          entering={BounceIn}
        />
      </Pressable>
      {selected && <ExplodingHearts count={15} />}
    </>
  );
}

export function AnimatedReactions() {
  return (
    <CenterScreen>
      <Heart />
    </CenterScreen>
  );
}
