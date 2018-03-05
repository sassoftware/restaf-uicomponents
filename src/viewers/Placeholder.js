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
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import OpenInBrowser     from 'material-ui/svg-icons/action/open-in-browser';

class Placeholder extends React.Component {
    constructor( props ){
        debugger;
        super( props );
        this.state = {
            service: '',
            err    : null
        }
    }

    componentDidMount() {
        debugger;
    }
    render () {
        debugger;
        return <div>
            <h2> Ready to Placeholder</h2>
            </div>

    }
}

Placeholder.contextTypes = {
    store: PropTypes.object
};

export default Placeholder;