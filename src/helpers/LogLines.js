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

// let React = require( 'react' );

function LogLines ( props ){
    let {folder} = props;
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

export default LogLines ;