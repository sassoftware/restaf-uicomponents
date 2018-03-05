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
 * Created by kumar on 3/20/2017.
 */
import React from 'react';

function ButtonMenu( props ) {
    let { cmds, onClick } = props;
    let menu = [];
    cmds.forEach( ( c, rel )  => {
        let name = c.get( 'link' ).get( 'title' );
        menu.push( <button key={name} onClick={onClick[rel]}
                           className="button"> {name} </button> );
    } );

    return (
        <div>
            {menu}
        </div>
    )
}

export { ButtonMenu } ;