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
import PropTypes from 'prop-types';
import {MuiThemeProvider} from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
/*
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
*/

module.exports = function ( WrappedComponent ) {
    debugger;
    class RafuiApp extends React.Component {
        constructor( props ) {
            super( props );
            this.store = props.store;
        }

        getChildContext() {
            return { store: this.store }
        }
        componentDidMount () {

        }
        render() {
            /* let muiTheme = getMuiTheme( lightBaseTheme );*/
            return (
                <BrowserRouter>
                    <MuiThemeProvider >

                            <div>
                                <WrappedComponent {...this.props} />
                            </div>

                    </MuiThemeProvider>
                </BrowserRouter>
            )
        }
    }

    RafuiApp.childContextTypes = {
        store: PropTypes.object
    };
    return RafuiApp;
};


