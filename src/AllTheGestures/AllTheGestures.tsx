import type { ReactNode } from "react";
import React from "react";
import { View } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import {
  createIdentityMatrix,
  rotateZ,
  scale3d,
  translate3d,
} from "../components/matrixMath";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function Movable({ children }: { children: ReactNode }) {
  const matrix = useSharedValue(createIdentityMatrix());

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        matrix: matrix.value,
      },
    ],
  }));

  const pan = Gesture.Pan().onChange(({ changeX, changeY }) => {
    matrix.value = translate3d(matrix.value, changeX, changeY, 0);
  });

  const rotate = Gesture.Rotation().onChange(({ rotationChange }) => {
    matrix.value = rotateZ(matrix.value, rotationChange, 0, 0, 0);
  });

  const pinch = Gesture.Pinch().onChange(({ scaleChange }) => {
    matrix.value = scale3d(
      matrix.value,
      scaleChange,
      scaleChange,
      scaleChange,
      0,
      0,
      0
    );
  });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(pan, rotate, pinch)}>
      <Animated.View>
        <Animated.View style={[{ position: "absolute" }, style]}>
          {children}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

export function AllTheGestures() {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Movable>
        <AnimatedIcon name="favorite" color="#ffaaa8" size={150} />
      </Movable>
    </View>
  );
}
