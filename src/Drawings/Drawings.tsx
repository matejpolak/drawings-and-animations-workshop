/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Canvas,
  Image,
  Path,
  Skia,
  useImage,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

const zurich = require("../assets/zurich.jpg");
const { width, height } = Dimensions.get("window");
export const Drawings = () => {
  const path = useValue(Skia.Path.Make());
  const image = useImage(zurich);

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      path.current.moveTo(x, y);
    },
    onActive: ({ x, y }) => {
      const lastPoint = path.current.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;
      path.current.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
    },
  });

  return !image ? null : (
    <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
      <Image
        x={0}
        y={0}
        width={width}
        height={height}
        image={image}
        fit="cover"
      />
      <Path
        path={path}
        style="stroke"
        strokeWidth={8}
        color="lightblue"
        strokeJoin="round"
        strokeCap="round"
      />
    </Canvas>
  );
};
