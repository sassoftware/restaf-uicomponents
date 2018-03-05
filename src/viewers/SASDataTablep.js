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

import { ScrollMenuBar } from  '../helpers/ScrollMenuBar';
import { SASDataTable } from '../helpers/SASDataTable';


class SASDataTablep extends React.Component {
    constructor( props ) {
        debugger;
        super( props );
        this.state = {
            store  : props.store,
            folder : props.folder,
            onClick: {
                first: this.doCommand.bind( this, 'first' ),
                next : this.doCommand.bind( this, 'next' ),
                prev : this.doCommand.bind( this, 'prev' ),
                last : this.doCommand.bind( this, 'last' )
            }
        };
    }

    render() {
        debugger;
        let { folder } = this.state;
        return (
            <div>
                <ScrollMenuBar cmds={folder.scrollCmds()} onClick={this.state.onClick} />
                <SASDataTable data={folder.items()} resultType={folder.resultType}  />
            </div>
        );
    }

    doCommand( rel  ) {
        let { store, folder }  = this.state;
        let nextCmd = folder.scrollCmds( rel );
        store.apiCall( nextCmd )
           .then( f => {
               this.setState( { folder: f } );
           } )
    }
}


export default SASDataTablep  ;


