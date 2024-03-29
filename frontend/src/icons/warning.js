import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export default function AlertIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 32}
      height={props.height || 32}
      viewBox="0 0 473.931 473.931"
      {...props}
    >
      <Circle
        xmlns="http://www.w3.org/2000/svg"
        cx={236.966}
        cy={236.966}
        r={236.966}
        fill="#ECC208"
        data-original="#e79e2d"
      />
      <Path
        xmlns="http://www.w3.org/2000/svg"
        d="M214.399 252.389l-6.698-100.159c-1.257-19.517-1.871-33.526-1.871-42.027 0-11.57 3.035-20.602 9.085-27.072 6.065-6.499 14.054-9.74 23.94-9.74 11.996 0 20.022 4.15 24.056 12.445 4.034 8.303 6.065 20.258 6.065 35.857 0 9.205-.494 18.559-1.459 28.022l-8.995 103.089c-.973 12.277-3.061 21.68-6.279 28.239-3.207 6.544-8.509 9.815-15.888 9.815-7.536 0-12.756-3.158-15.682-9.512-2.929-6.33-5.028-15.995-6.274-28.957zm23.21 137.585c-8.501 0-15.936-2.739-22.267-8.251-6.346-5.497-9.512-13.197-9.512-23.102 0-8.647 3.035-16.004 9.085-22.069 6.065-6.065 13.493-9.092 22.275-9.092 8.786 0 16.269 3.027 22.477 9.092 6.204 6.065 9.31 13.425 9.31 22.069 0 9.751-3.136 17.414-9.418 22.997-6.268 5.572-13.583 8.356-21.95 8.356z"
        fill="#fff"
        data-original="#ca7b29"
      />
    </Svg>
  )
}
