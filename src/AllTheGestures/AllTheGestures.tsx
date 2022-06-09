import type { ReactNode, ComponentProps } from "react";
import React, { Fragment, useCallback, useState } from "react";
import type { ColorValue } from "react-native";
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
import { Toolbar } from "../GestureBasedPicker";

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
  const [items, setItems] = useState<ReactNode[]>([]);

  const onAddItem = useCallback(
    (
      iconName: ComponentProps<typeof Icon>["name"],
      color: ColorValue,
      size: number
    ) => {
      setItems([
        ...items,
        <Movable>
          <AnimatedIcon name={iconName} color={color} size={size} />
        </Movable>,
      ]);
    },
    [items]
  );

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {items.map((item, index) => (
        <Fragment key={index}>{item}</Fragment>
      ))}
      <View
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Toolbar onItemPress={onAddItem} />
      </View>
    </View>
  );
}
