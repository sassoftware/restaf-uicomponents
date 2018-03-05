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
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table'

function ComputeDataTableRowSet2( props ) {

    let { folder } = props;

    folder.items( 'columns' ).toJS();
    let itemsRows = folder.items( 'rows' );

    // redo the data
    debugger;
    let columns = [ 'RowNo' ];
    folder.items( 'columns' ).map ( ( c ) => {
        columns.push( c );
    } );

    let data = [];
    itemsRows.map ( ( r, i )=> {
        let row = {RowNo: i};
        r.map( ( value, j ) => {
           row[columns[ j + 1 ] ]  = value;
        } );
        data.push( row );
    } );
    debugger;
    return <Table selectable={false}>
                <TableHeader style={ {background: "mocassin"} }
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                    >
                    <TableRow>
                        {columns.map( ( c, i ) => <TableHeaderColumn key={i}>{c}</TableHeaderColumn> ) }
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    stripedRows={true}
                    >
                    {data.map( ( row, index ) => {
                        return ( <TableRow key={index} >
                            {columns.map( ( c, ic ) => <TableRowColumn key={index+ic}> {row[c]}</TableRowColumn> ) }
                        </TableRow> )
                    } ) }
                </TableBody>
                </Table>;
}

export default ComputeDataTableRowSet2;