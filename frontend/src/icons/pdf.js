import * as React from "react";
import Svg, { Path, G } from "react-native-svg";

function Pdf(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        xmlns="http://www.w3.org/2000/svg"
        d="M392 488H120a48 48 0 01-48-48V72a48 48 0 0148-48h224l96 96v320a48 48 0 01-48 48z"
        fill="#cfd2fc"
        data-original="#cfd2fc"
      />
      <Path
        xmlns="http://www.w3.org/2000/svg"
        d="M136 136h80v96h-80zM72 360h368v80a48 48 0 01-48 48H120a48 48 0 01-48-48v-80z"
        fill="#2d2a9b"
        data-original="#5153ff"
      />
      <G xmlns="http://www.w3.org/2000/svg" fill="#8690fa">
        <Path
          d="M440 120h-48a48 48 0 01-48-48V24zM376 176H248a8 8 0 010-16h128a8 8 0 010 16zM280 208h-32a8 8 0 010-16h32a8 8 0 010 16zM376 240H248a8 8 0 010-16h128a8 8 0 010 16zM320 272H136a8 8 0 010-16h184a8 8 0 010 16zM376 208h-64a8 8 0 010-16h64a8 8 0 010 16zM376 272h-24a8 8 0 010-16h24a8 8 0 010 16zM184 304h-48a8 8 0 010-16h48a8 8 0 010 16zM296 304h-80a8 8 0 010-16h80a8 8 0 010 16zM376 304h-48a8 8 0 010-16h48a8 8 0 010 16zM312 144h-64a8 8 0 010-16h64a8 8 0 010 16z"
          fill="#2d2a9b"
          data-original="#8690fa"
        />
      </G>
      <Path
        xmlns="http://www.w3.org/2000/svg"
        d="M336 384h-32a8 8 0 00-8 8v64a8 8 0 0016 0v-24h8a8 8 0 000-16h-8v-16h24a8 8 0 000-16zM192 384h-16a8 8 0 00-8 8v64a8 8 0 0016 0v-24h8a24 24 0 000-48zm0 32h-8v-16h8a8 8 0 010 16zM240 384a8 8 0 00-8 8v64a8 8 0 008 8 40 40 0 000-80zm8 62.629v-45.258a24 24 0 010 45.258z"
        fill="#fff"
        data-original="#ffffff"
      />
    </Svg>
  );
}

export default Pdf;
