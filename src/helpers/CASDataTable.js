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
import ReactDataGrid from 'react-table' ;

function CASDataTable( props ) {

    let { data } = props;
    let rows = data.get( 'rows' );
    let columns = [];
    data.get( 'schema' ).map( s => {
        let name = s.get( 'name' );
        let r = {
            key      : name,
            name     : name,
            resizable: true
        };
        columns.push( r );
    } );

    console.log( columns );
    let rowGetter = getData.bind( null, rows, columns );

    debugger;
    return (
        <div>
            <ReactDataGrid
                columns={columns}
                rowGetter={rowGetter}
                rowsCount={rows.size}
                minHeight={500}
            />
        </div>

    )
}

function getData ( rows, columns, i ) {
    debugger;
    let row = rows.get( i );
    let r = {};
    columns.map( ( c, i ) => {
        r[c.key] = row.get( i );
    } );
    return r;
}



export default CASDataTable;