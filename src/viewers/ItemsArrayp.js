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

class ItemsArrayp extends React.Component {
    constructor( props ){
        debugger;
        super( props );
        this.state = {
            folder: null,
            parms : null
        }
    }
    componentWillMount() {
        debugger;
        this._loadProps( this.props );
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        this._loadProps( nextProps );
    }

    _loadProps = (props) => {
        let folder = this.context.store.rafObject( props.location.state.route );
        let parms = {...props.location.state };
        this.setState( {folder: folder, parms: parms} );
    }
    render () {
        debugger;
        let { folder } = this.state;
        let viewer = findViewer( folder.resulttype );
        return <div>
                  { viewer( folder, this.state.parms )}
               </div>
    }
}

function findViewer( media ){
    let viewer = null;
    switch( media ) {
        case 'data':
            viewer = simpleDataViewer;
            break;
        default:
            viewer = jsonViewer

    }
    return viewer;
}

function jsonViewer( folder ){
    return <div>
        <h1> {folder.resultType} </h1>
        <pre>
             {JSON.stringify(folder.items(), null, 4)}
         </pre>
     </div>
}

function simpleDataViewer( folder ) {
    let t = folder.items().toJS();
    return <div> {t} </div>
}

ItemsArrayp.contextTypes = {
    store: PropTypes.object
};

export default ItemsArrayp;