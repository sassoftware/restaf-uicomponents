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
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import serviceNames from '../../util/serviceNames';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';


import OpenInBrowser     from 'material-ui/svg-icons/action/open-in-browser';

class _ServicePromptp extends React.Component {
    constructor( props ){
        debugger;
        super( props );
        this.state = {
            service: '',
            index  : -1,
            select : '',
            err    : null
        }
    }

    componentDidMount() {
        debugger;
    }
    render () {

        const style = {
            display: 'inline-block',
            margin : '16px 32px 16px 0'
        };

        let dropDown = serviceNames().map( ( n, i ) => {
            return <MenuItem value={n} key={i} primaryText={n} />
        } );

        return <div>
            <h2> Enter service name or select from the dropdown menu below </h2>
            <TextField id="service" ref="service" key="service" floatingLabelText="Service name"
                       disabled={false} style={{ width: 400 }} />
            <IconButton onTouchTap={this._onRun}>
                <OpenInBrowser/>
            </IconButton>
            <div>
                <div>
                    <SelectField
                        floatingLabelText="Available list of services"
                        value={this.state.select}
                        onChange={this._onSelection}
                        maxHeight={200}
                    >
                        {dropDown}
                    </SelectField>
                </div>
                { ( this.state.err === null ) ? null : JSON.stringify( this.state.err, null, 4 )  }

            </div>
            </div>

    }

    _onSelection = ( event, index, select ) => {
        this.setState( {select: select, index: index, err: null} );
    }

    _onRun = ( ) => {
        let value = this.refs.service.getValue();
        if ( value.length <= 0 ) {
            value = this.state.select;
        }
        if ( value.length > 0 ) {
            this.context.store.addServices( value )
                .then( services => {
                    let f = services[value];

                    let path = `/${f.type}`;
                    let parm = {
                        route       : f.route,
                        parentRoute : null,
                        parentSource: null
                    };
                    this.setState( { err: null } );
                    this.props.history.push( path, parm );
                } )
                .catch( err => {
                    this.setState( {err: err} );
                } )
        }

    }
}

_ServicePromptp.contextTypes = {
    store: PropTypes.object
};

let ServicePromptp = withRouter( _ServicePromptp );
export default ServicePromptp;