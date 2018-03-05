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
/*
 * Copyright: SAS Institute, Cary, MC ( 2016))
 * Created by kumar on 1/12/2017.
 */
import React from 'react';
// import ReactDataGrid from 'react-data-grid' ;

class CasTableRows extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            store : props.store,
            table : props.table,
            detail: props.detail,

            from    : 1,
            maxRows : 20,
            rowCount: props.detail.maxCount,
            columns : null,
            rows    : null,
            err     : null
        }
    }

    componentDidMount() {
        debugger;
        this._gotoRow();
    }

    _gotoRow () {
        let {table, store } = this.state;
        let qs = {
            maxRows: this.state.maxRows,
            from   : this.state.from
        };

        getRows( store, table, qs )
            .then ( r => {
                this.setState(
                    {
                        rows   : r.rows,
                        columns: r.columns,
                        err    : null
                    } )

            } )
            .catch ( err => {
                this.setState( { err: err } )
            } )

    }

    render() {
        let r = JSON.stringify( this.state.r.items(), null, 4  );
        return <div>
            {r}
            {this.state.err !== null ? JSON.stringify( this.state.err, null, 4 ) : null }
            </div>

    }

    _scroll = () => {


    }
}

async function getRows( store, folder, qs  ) {
    let rowLink = folder.links( 'row' );
    let colLink = folder.links( 'columns' );

    let colObj = await store.apiCall( colLink );
    let rowObj = await store.apiCall( rowLink, qs );

    return {
        rows   : rowObj,
        columns: colObj
    }
}


export default CasTableRows;
