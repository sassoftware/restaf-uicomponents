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

import React from 'react' ;
import CommandMenu from './CommandMenu';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

import MenuItem from 'material-ui/MenuItem';

function XcommandBar ( props ) {
    let { leftCmds, rightCmds, title, leftCallback, rightCallback } = props;
    debugger;
    let leftMenuList = menuList( leftCmds );
    let rightMenuList = menuList( rightCmds );
    return (
        <div>
            <Toolbar>
                <ToolbarGroup firstChild={true} >
                    <IconMenu anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                              targetOrigin={{horizontal: 'right', vertical: 'top'}}
                              onItemTouchTap={ onMenuSelect.bind( null, onCommand ) }
                              iconButtonElement={
                                  <IconButton touch={true} disabled={leftMenuList === null} >
                                      <MenuIcon />
                                  </IconButton>
                              }
                    >
                        {leftMenuList}
                    </IconMenu>
                </ToolbarGroup>
                <ToolbarGroup>
                    <CommandMenu cmds={leftCmds} onSelect={onCommand} pagination={true}  />
                </ToolbarGroup>
                <ToolbarGroup>
                    {title}
                </ToolbarGroup>
                <ToolbarGroup>
                    <IconMenu anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                              targetOrigin={{horizontal: 'right', vertical: 'top'}}
                              onItemTouchTap={ onMenuSelect.bind( null, onCommand ) }
                              iconButtonElement={
                                  <IconButton touch={true} disabled={rightMenuList === null}>
                                      <MoreVertIcon />
                                  </IconButton>
                              }
                    >
                        {rightMenuList}
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        </div>
    );
}

function onMenuSelect ( onCommand, e, obj ) {
    let val = obj.props.value;
    onCommand( val );
}

function menuList ( cmds ) {
    let list = [];
    if ( cmds === null ) {
        return null;
    }
    cmds.forEach( cmd => {
        if ( cmd.get( 'paginator' ) === false ) {
            let route = cmd.get( 'route' );
            let t = <MenuItem value={route} key={route} primaryText={cmd.get( 'name' ) } />;
            list.push( t )
        }
    } );

    return ( list.length > 0 ) ? list : null ;
}
export { XcommandBar };

