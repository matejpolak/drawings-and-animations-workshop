/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Canvas,
  useImage,
  Image,
  useSharedValueEffect,
  useValue,
  Group,
} from "@shopify/react-native-skia";
import { Dimensions, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

import {
  createIdentityMatrix,
  scale3d,
  toSkMatrix,
} from "../components/matrixMath";

const zurich = require("../assets/zurich.jpg");
const { width, height } = Dimensions.get("window");

export const PinchToZoom = () => {
  const image = useImage(zurich);
  const matrix = useSharedValue(createIdentityMatrix());
  const skiaMatrix = useValue(toSkMatrix(createIdentityMatrix()));

  const pinch = Gesture.Pinch().onChange(({ scaleChange, focalX, focalY }) => {
    matrix.value = scale3d(
      matrix.value,
      scaleChange,
      scaleChange,
      scaleChange,
      focalX,
      focalY,
      0
    );
  });

  useSharedValueEffect(() => {
    skiaMatrix.current = toSkMatrix(matrix.value);
  }, matrix);

  return !image ? null : (
    <View style={{ flex: 1 }}>
      <GestureDetector gesture={pinch}>
        <Canvas style={{ flex: 1 }}>
          <Group matrix={skiaMatrix} transform={[]}>
            <Image
              x={0}
              y={0}
              width={width}
              height={height}
              image={image}
              fit="cover"
            />
          </Group>
        </Canvas>
      </GestureDetector>
    </View>
  );
};
