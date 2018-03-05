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

let React = require( 'react' );
/*
import { ButtonMenu } from '../helpers/ButtonMenu';
*/
import ScrollMenuBar from '../helpers/ScrollMenuBar'

class LogListp extends React.Component {
    constructor( props ) {

        super( props );
        debugger;
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
        let { folder, onClick }= this.state;
        let cmds = folder.scrollCmds();
        return (
            <div>
                <div className="wrapper1">
                    <div className="headerx">
                        <ScrollMenuBar cmds={cmds} onClick={onClick} />
                    </div>
                </div>
                <div className="wrapper2">
                    <div className="main-2">
                        { this.showLog( folder ) }
                    </div>
                </div>
            </div>
        );
    }

    // This combines cmdsNext and apiCall from test/paginate.js

    doCommand( rel ) {
        debugger;
        let { store, folder } = this.state;

        let nextCmd = folder.scrollCmds ( rel );

        store.apiCall( nextCmd )
           .then( f => {
               this.setState( { folder: f } )
           } )
    }


    //
    // Programmers: Note the use if folder methods to get to data
    // You lose some of the protection of getResults
    // showLog can also be used for Listing

    showLog( folder ) {
        debugger;
        let dataL = folder.items();
        let outAll = [];
        dataL.map( ( data, i ) => {
            let out;
            let line = data.get( 'line' ).replace( /(\r\n|\n|\r)/gm, "" );
            if ( line.length === 0 ) {
                line = '  ';
            }
            let type = data.get( 'type' );
            if ( type === 'title' ) {
                out = <h2 key={i} className={type}> {line} </h2>;
            } else {
                out = <p key={i} className={type}> {line} </p>;
            }
            outAll.push( out );
        } );
        return outAll;
    }
}

export default LogListp ;