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
import LogLines from './LogLines';
import ComputeDataTableRowSet from './ComputeDataTableRowSet';

function getCustomViewer ( folder ) {

    let resultType = folder.resultType;
    let Viewer = null;
    switch ( resultType ) {
        case 'application/vnd.sas.compute.log.line':
            Viewer = <LogLines folder={folder}/>;
            break;
        case 'application/vnd.sas.compute.data.table.row.set':
            Viewer = <ComputeDataTableRowSet folder={folder} />;
            break;
        default:
            Viewer = <h2> No custom viewer at this time </h2>;
            break;
    }

    return Viewer;
}


export default getCustomViewer ;