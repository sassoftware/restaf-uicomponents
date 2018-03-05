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

module.exports = function ( store, job, apiCall ) {
    return new Promise( ( resolve, reject ) => {
        debugger;
        let statePayload = { qs: { newState: 'completed', timeout: 10} } ;
        let stateCmd     = job.links( 'state' );
        debugger;
        apiCall( store, stateCmd, statePayload )
           .then ( r => {
               debugger;
               let data     = r.items( );
               let httpCode = r.status;
               if ( httpCode === 304 ) {
                   alert( 'Job timed out' );
                   reject( 'Job timed out' );
               } else if ( httpCode === 204 || data === 'completed' ) {
                   resolve( job );
               } else {
                   alert ( `Rejected for unknown status  ${status} ` );
                   reject( `Rejected for unknown status  ${status} ` );
               }
           } )
           .catch( err => {
               alert( 'check for status failed' );
               reject( err );
           } )

    } )
};