/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Canvas,
  ColorMatrix,
  Group,
  Image,
  useImage,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

import { Filters, selectFilter } from "./Filters";
import { noFilter } from "./steps/Final/Filters";

const zurich = require("../assets/zurich.jpg");
const { width, height } = Dimensions.get("window");

export const PhotoEditor = () => {
  const matrix = useValue(noFilter);
  const image = useImage(zurich);

  const touchHandler = useTouchHandler({
    onEnd: (event) => {
      selectFilter(matrix, event);
    },
  });

  if (!image) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
      <Group>
        <ColorMatrix matrix={matrix} />
        <Image
          x={0}
          y={0}
          width={width}
          height={height}
          image={image}
          fit="cover"
        />
      </Group>
      <Filters image={image} />
    </Canvas>
  );
};
