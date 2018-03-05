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
import { BrowserRouter, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import ScrollMenuBar  from  '../helpers/ScrollMenuBar';
import ItemsListNav from '../helpers/ItemsListNav';
import IconButton      from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import HomeMenu  from 'material-ui/svg-icons/action/home';
import MoreHorizontalMenu  from 'material-ui/svg-icons/navigation/more-horiz';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import CasTableRows from '../helpers/CasTableRows';

class _Caslibp extends React.Component {
    constructor( props ) {
        debugger;
        super( props );
        //
        // TBD: Check memory leak on binds
        this.state = {
            folder     : props.folder,
            title      : props.title,
            selected   : -1,
            selectedlib: -1,
            caslib     : null,
            table      : null,
            detail     : null,
            content    : null,
            msg        : null,
            onClick    : {
                first: this.doCommand.bind( this, 'first' ),
                next : this.doCommand.bind( this, 'next' ),
                prev : this.doCommand.bind( this, 'prev' ),
                last : this.doCommand.bind( this, 'last' )
            }

        };
    }

    render() {
        debugger;

        let title = 'CAS Table Explorer';
        let viewer = this._renderViewer( );
        return (
            <BrowserRouter>
                <div>
                    <div className="rafuip-header">
                        <Toolbar>
                            <ToolbarGroup>
                                <IconButton onTouchTap={this._home}>
                                    <HomeMenu/>
                                </IconButton>
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <ToolbarTitle text={title}/>
                            </ToolbarGroup>
                        </Toolbar>
                    </div>
                    {viewer}
              </div>
            </BrowserRouter>
        );
    }

    _renderViewer= ( ) => {
        debugger;

        let { selected, folder, caslib } = this.state ;
        let content = ( selected < 0 ) ? <h1> Please select one </h1> : this.state.content;

        let f = ( caslib === null ) ? folder : caslib;

        let panel1 = <ItemsListNav itemsList={ f.itemsList()}
                                   selected={selected}
                                   onChange={this._onChange}/>;
        let prompt = ( caslib === null  && selected >= 0 )  ?
                     <Chip onClick={this._handleOpen}>
                         <Avatar icon={<MoreHorizontalMenu />}/>
                         Tables
                     </Chip>
                     : null;

        return  <div className="rafuip-main-content">
                    <div className="rafuip-sidebar-one">
                        <ScrollMenuBar cmds={f.scrollCmds()} onClick={this.state.onClick}/>
                        {panel1}
                    </div>
                    <div className="rafuip-content">
                        {content}
                        {prompt}
                        {this.state.msg}
                    </div>
              </div>
        };

    //
    // USer selected an item on the navigator
    //

    _home = () => {
        this.setState( { caslib: null , selected: this.state.selectedlib } );
        this._ionChange( this.state.folder, null, this.state.selectedlib );
        // this.props.history.push( '/CASTables' );
    };
    _handleOpen = () => {
        debugger;
        let { folder, selected } = this.state ;
        let { store }  = this.context;
        debugger;
        let rafLink = folder.itemsCmd( folder.itemsList( selected ), 'tables' );
        store.apiCall( rafLink )
             .then ( f => {
                 debugger;
                 if ( f.itemsList().size === 0 ) {
                     this.setState( { msg: 'No tables in caslib'} );
                 } else {
                     debugger;
                     this.setState( { caslib: f , selected: -1, selectedlib: selected } );
                     // this.props.history.push( '/CASTables', { route: f.route } );
                 }

             } )
             .catch( err => {
                 console.log( err );
             } )
    };


    _onChange = ( e, selected ) => {
        debugger;
        let { folder, caslib } = this.state;
        this._ionChange( folder, caslib, selected );
    };

    _ionChange = ( folder, caslib, selected ) => {
        let { store } = this.context;
        let f      = ( caslib === null ) ? folder : caslib;
        let detail = f.items( folder.itemsList( selected ), 'data' );
        let content = <pre> { JSON.stringify( detail, null, 4 ) } </pre>;
        this.setState( {selected: selected, detail: detail, content: content } );
        if ( caslib !== null ) {
            let rafLink = f.itemsCmd( f.itemsList( selected ), 'dataTable' );
            store.apiCall( rafLink )
                 .then ( table => {
                     let content = <CasTableRows  store={store} table={table} detail={detail} />;
                     this.setState( {content: content, table: table } );
                 } )
                 .catch ( err => {
                     let content = <pre> { JSON.stringify( err, null, 4 ) } </pre>;
                     this.setState( { content: content } )
                 } )
        }

    };
    //
    // Support pagination cmds
    //
    doCommand( rel  ) {
        let { folder, caslib } = this.state;
        let { store }  = this.context;
        let f = ( caslib === null ) ? folder : caslib;
        let nextCmd = f.scrollCmds( rel );
        store.apiCall( nextCmd )
             .then( f => {
                 if ( caslib === null ) {
                     this.setState( { folder: f, selected: 0 } );
                 } else {
                     this.setState( { caslib: f, selected: 0 } );
                 }
             } )
    }
}


_Caslibp.contextTypes = {
    store: PropTypes.object
};
let Caslibp =  withRouter( _Caslibp ) ;
export default Caslibp  ;


