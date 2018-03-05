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
import './generic.css';
import CASOutputNav  from '../helpers/CASOutputNav';
import CASDataTable  from '../helpers/CASDataTable';

class CASOutputp extends React.Component {
    constructor ( props ) {
        super( props );
        this.state = {
            selected: 'log'
        }
    }

    render( ) {
        let { folder } = this.props;
        let panel1 = <div className="xyz xyz-0">
            <CASOutputNav data={folder.items()} selected={this.state.selected}
                          onChange={ this._selection } />
        </div>;
        debugger;
        return (
            <div className="wrapper-2">
                { panel1}
                <div className="main" >
                    {this._item( folder )}
                </div>
            </div>
        );
    }

    _selection = ( e, s ) => {
        this.setState( {selected: s } );
    };

    _item = ( folder ) => {
        let r = null;
        let item = folder.items( this.state.selected );
        debugger;
        if ( typeof item === 'string' ) {
            r = <div> {item} </div>
        } else {
            if ( this.state.selected.indexOf( 'tables:' ) >= 0 ) {
                r = showTable( folder, this.state.selected );
            } else if ( this.state.selected !== 'tables' ) {
                r = <div>
                    <pre className="prettyprint"> { JSON.stringify( item, null, 4 ) } </pre>
                   </div>;
            }
        }

        return r;
    };
}
function showTable ( folder, selected ) {
    let path = selected.split( ':' );
    let table = folder.items( ...path );
    debugger;
    return (
            <CASDataTable data={table} />
    )
}
export default CASOutputp ;
