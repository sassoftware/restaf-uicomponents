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
import { RaisedButton } from 'material-ui/RaisedButton';

function CommandMenu ( props ) {

    let { cmds, onSelect } = props;
    debugger;

    let buttons = [];
    cmds.forEach( ( c, rel ) => {
        let title = c.get( 'link' ).get( 'title' );
        let t = <RaisedButton
            label={title} onTouchTap={ _onSelect.bind( null, c.route, onSelect ) }
            style={ { margin: 12, fontSize: 42 } } key={c.route}
            className="button"> {name} </RaisedButton>;
        buttons.push( t );
    } );

}
function _onSelect ( route, onSelect ) {
    debugger;
    onSelect( route ) ;
}

export default CommandMenu;
