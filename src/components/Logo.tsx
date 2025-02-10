import React from "react";
import { SvgXml } from "react-native-svg";

const Logo: React.FC = () => {
    return (
        <SvgXml
            xml={`<svg height="25" width="25" fill="#fff" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 50">
        <circle cx="85" cy="25" r="25" />
        <rect y="20" fill="#0040ff" width="50" height="10" />
        <rect y="20" fill="#0040ff" width="50" height="10" />
      </svg>`}
            width="50" // Set the width to 25 as well if you want to maintain the same proportion
            height="30" // Set the height to 25
        />
    );
};

export default Logo;
