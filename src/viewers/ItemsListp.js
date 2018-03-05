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
import { BrowserRouter,Route,  withRouter } from 'react-router-dom';

import ScrollMenuBar  from  '../helpers/ScrollMenuBar';
import ItemsListNav from '../helpers/ItemsListNav';
import IconButton      from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import HomeMenu  from 'material-ui/svg-icons/action/home';
import MoreHorizontalMenu  from 'material-ui/svg-icons/navigation/more-horiz';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import PropTypes from 'prop-types';

class _ItemsListp extends React.Component {
    constructor( props ) {
        debugger;
        super( props );
        //
        // TBD: Check memory leak on binds
        this.state = {
            folder  : props.folder,
            title   : props.title,
            selected: 0,
            msg     : null,
            onClick : {
                first: this.doCommand.bind( this, 'first' ),
                next : this.doCommand.bind( this, 'next' ),
                prev : this.doCommand.bind( this, 'prev' ),
                last : this.doCommand.bind( this, 'last' )
            }
        };
    }

    render() {
        debugger;
        let { folder } = this.state;
        let panel1 = <ItemsListNav itemsList={folder.itemsList()} selected= {this.state.selected }
                                   onChange = {this._onChange} />;
        let title = 'CAS Table Explorer';
        return (
            <BrowserRouter>
                <div>
            <div>
               <div className="rafuip-header">
                   <Toolbar>
                       <ToolbarGroup>
                           <IconButton onTouchTap={this._leftNav}>
                               <HomeMenu/>
                           </IconButton>
                       </ToolbarGroup>
                       <ToolbarGroup>
                           <ToolbarTitle text={title}/>
                       </ToolbarGroup>
                   </Toolbar>
               </div>
                <div className="rafuip-main-content">
                    <div className="rafuip-sidebar-one">
                        <ScrollMenuBar cmds={folder.scrollCmds()} onClick={this.state.onClick} />
                        {panel1}
                    </div>
                    <div className="rafuip-sidebar-two">
                        <ScrollMenuBar cmds={folder.scrollCmds()} onClick={this.state.onClick} />
                        {panel1}
                    </div>
                    <div className="rafuip-content">
                    {this._item( folder )}
                        <Chip onClick={this._handleOpen}>
                            <Avatar icon={<MoreHorizontalMenu />} />
                            Tables
                        </Chip>
                        {this.state.msg}
                    </div>
                </div>
            </div>

        </div>
        </BrowserRouter>
        );
    }

    //
    // USer selected an item on the navigator
    //

    _handleOpen = () => {
        debugger;
        let { folder } = this.state ;
        let { store }  = this.context;
        console.log( ` Selected= ${folder.itemsList( this.state.selected )}` );
        debugger;
        let rafLink = folder.itemsCmd( folder.itemsList( this.state.selected ), 'tables' );
        store.apiCall( rafLink )
            .then ( f => {
                debugger;
                if ( f.itemsList().size === 0 ) {
                    this.setState( { msg: 'No tables in caslib'} );
                } else {
                    debugger;
                    this.props.history.push( '/CASTables' );
                }

            } )
            .catch( err => {
                console.log( err );
            } )
    };

    _onChange = ( e, s ) => {
        console.log( s );
        debugger;
        this.setState( { selected: s, msg: null  } );
    };

    _item = ( folder ) => {
        debugger;
        let item = folder.items( folder.itemsList( this.state.selected ), 'data' ).toJS();

        return  <pre> { JSON.stringify( item, null, 4 ) } </pre>
    };
    //
    // Support pagination cmds
    //
    doCommand( rel  ) {
        let { folder }  = this.state;
        let { store } = this.context;
        let nextCmd = folder.scrollCmds( rel );
        store.apiCall( nextCmd )
             .then( f => {
                 this.setState( { folder: f , selected: 0 }  );
             } )
    }
}

_ItemsListp.contextTypes = {
    store: PropTypes.object
};
let ItemsListp =  withRouter( _ItemsListp ) ;
export default ItemsListp  ;


