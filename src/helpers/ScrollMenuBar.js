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

import IconButton from 'material-ui/RaisedButton';

import FirstPage from 'material-ui/svg-icons/navigation/first-page';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import LastPage from 'material-ui/svg-icons/navigation/last-page';

let paginationCmds = [ 'first', 'prev', 'next', 'last' ];
let paginationIcons = [ <FirstPage/>, <ChevronLeft/>, <ChevronRight/>, <LastPage/> ];

function ScrollMenuBar( props ) {
    let { cmds, onClick } = props;
    debugger;
    let menu = [];
    cmds.forEach( ( c, rel )  => {
        let t = <IconButton onTouchTap={ onClick [rel] }
                            key={rel}>
            {paginationIcons[paginationCmds.findIndex( cmd => cmd === rel )]}
        </IconButton>;
        menu.push( t );
    } );
    return (
        <div>
            {menu}
        </div>
    )
}

export default  ScrollMenuBar  ;