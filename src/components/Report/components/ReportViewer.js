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
import { BrowserRouter, Route, Switch, match } from 'react-router-dom';

import ReactDOM from 'react-dom' ;
import Home from './Home';
import Next from './Next';

function ReportViewer ( props, el  ) {

    let l = <BrowserRouter>
             <div>
                <Link to="/" path="/next" component={Next}/>
            </div>
           </BrowserRouter>;

    ReactDOM.render( l, document.querySelector( el ) );

}

export default ReportViewer ;
