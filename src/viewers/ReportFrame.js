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


class ReportFrame extends React.Component {
    constructor( props ) {
        debugger;
        super( props );
        console.log( 'in report frame' );
        console.log( props );
    }

    render() {
        debugger;
        console.log( ' in render' );
        let { host, reportList, selected } = this.state;
        let id = reportList.items( reportList.itemsList( selected ), 'data', 'id' );
        console.log( `id = ${id}` );
        let url = `${host}/SASReportViewer/?reportUri=/reports/reports/${id}&appSwitcherDisabled=true&reportViewOnly=true`;
        console.log( url );
        return  <a href={url} target="_blank"> </a>
    }

}
export default ReportFrame;
