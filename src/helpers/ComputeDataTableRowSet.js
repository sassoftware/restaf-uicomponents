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
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function ComputeDataTableRowSet( props ) {

    let { folder } = props;

    folder.items( 'columns' ).toJS();
    let itemsRows = folder.items( 'rows' );

    // redo the data
    debugger;
    let columns = [ ];
    folder.items( 'columns' ).map ( ( c ) => {
        columns.push( c );
    } );

    let columnInfo = columns.map( ( c ) => {
        return {
            Header     : c,
            accessor   : c,
            headerStyle: {
                textAlign      : "left",
                backgroundColor: "lightgray"
            }
        }
    } );

    let data = [];
    itemsRows.map ( ( r )=> {
        let row = {};
        r.map( ( value, j ) => {
           row[columns[ j ] ]  = value;
        } );
        data.push( row );
    } );
    debugger;
    return <ReactTable data={data} columns={columnInfo}
               defaultPageSize={10} />
}

export default ComputeDataTableRowSet;