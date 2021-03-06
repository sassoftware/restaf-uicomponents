/*
 *  ------------------------------------------------------------------------------------
 *  Copyright (c) SAS Institute Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  You may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

function wrapper( props, elementId, Component ) {
    debugger;
    ReactDOM.render( <Component {...props }  />,
        document.querySelector( elementId ) );
}

export default wrapper ;