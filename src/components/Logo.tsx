/**
 * @license
 * Copyright 2025 Varshil J. Patel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { SvgXml } from "react-native-svg";

const Logo: React.FC = () => {
    return (
        <SvgXml
            xml={`<svg width="50" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1297.81 865.2"><path fill="#0040ff" d="M1297.81,43.3l-75-43.3L686.4,259.6V43.3L611.4,0,75,259.6V173l-.17.1L0,216.3v86.6l74.82,43.2L0,389.3v86.6l74.82,43.2L0,562.3v86.6l74.82,43.2L0,735.3v86.6l75,43.3L611.4,605.6V821.9l75,43.3,536.41-259.6v86.6l.17-.1,74.83-43.2V562.3L1223,519.1l74.82-43.2V389.3L1223,346.1l74.82-43.2V216.3L1223,173.1l74.82-43.2ZM611.4,519.2,75,778.6V692L611.4,432.6Zm0-173L75,605.6V519L611.4,259.6Zm0-173L75,432.6V346L611.4,86.6Zm611.41,346L686.4,778.6V692l536.41-259.4Zm0-173L686.4,605.6V519l536.41-259.4Zm0-173L686.4,432.6V346L1222.81,86.6Z"/></svg>`}
            width="50"
            height="30"
        />
    );
};

// Old logo
// const Logo: React.FC = () => {
//     return (
//         <SvgXml
//             xml={`<svg height="25" width="25" fill="#fff" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 50">
//         <circle cx="85" cy="25" r="25" />
//         <rect y="20" fill="#0040ff" width="50" height="10" />
//         <rect y="20" fill="#0040ff" width="50" height="10" />
//       </svg>`}
//             width="50" // Set the width to 25 as well if you want to maintain the same proportion
//             height="30" // Set the height to 25
//         />
//     );
// };

export default Logo;
