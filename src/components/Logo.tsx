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
