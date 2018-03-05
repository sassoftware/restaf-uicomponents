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
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

import ScrollMenuBar  from  '../helpers/ScrollMenuBar';
import ItemsListNav from '../helpers/ItemsListNav';
import getCustomViewer from '../helpers/getCustomViewer';
import IconButton      from 'material-ui/IconButton';
import HomeMenu  from 'material-ui/svg-icons/action/home';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Toggle from 'material-ui/Toggle';

//import Popover from 'material-ui/Popover';
import scroll from '../helpers/scroll';
import JSONPretty from 'react-pretty-json';
import {Tabs, Tab} from 'material-ui/Tabs';
import LinearProgress from 'material-ui/LinearProgress';

class _LinksListp extends React.Component {
    constructor( props ) {
        debugger;
        super( props );
        this.state = {
            title   : 'Explorer',
            rel     : 'root',
            folder  : null,
            msg     : null,
            selected: 0,
            tabValue: 'raw',
            busy    : false,
            toggled : false,
            onClick : {
                first: scroll.bind( this, 'first' ),
                next : scroll.bind( this, 'next' ),
                prev : scroll.bind( this, 'prev' ),
                last : scroll.bind( this, 'last' )
            }
        };
        this.state = { ...this.state, ...props.location.state };
    }

    componentWillMount() {
        debugger;
        this._loadProps( this.props );
    }

    componentWillReceiveProps( nextProps ) {
        debugger;
        this._loadProps( nextProps );
    }

    _loadProps = ( props ) => {
        let folder = this.context.store.rafObject( props.location.state.route );
        let selected = 0;
        let msg = null;
        debugger;
        let rel   = folder.config(  'input', 'link', 'rel' );
        let title = folder.resultType;

        this.setState(
            {
                folder  : folder,
                msg     : msg,
                selected: selected,
                rel     : rel,
                title   : title,
                busy    : false
            }
        );
    };

    render() {
        debugger;
        return (

                <div>
                    {this._renderViewer()}
                </div>

        );
    }

    _renderViewer = () => {
        debugger;
        let {selected, folder } = this.state;
        let linksPanel = null;
        let itemsPanel = null;
        let cmdsPanel  = null;
        let msg        = null;
        let showBusy   = <LinearProgress mode="indeterminate"/>;

        if ( folder.type === 'links' ) {
            let nav = folder.links();
            if ( nav !== null && nav.size > 0 ) {
                linksPanel = <ItemsListNav
                    itemsList={nav}
                    selected={selected}
                    type="links"
                    filter="ALL"
                    title="Links"
                    onChange={this._onLinksSelect}
                />;
            }
        } else if ( folder.type === 'itemsList' && folder.itemsList().size > 0 ) {
            let nav = folder.links();
            if ( nav !== null && nav.size > 0 ) {
                linksPanel = <ItemsListNav
                    itemsList={nav}
                    selected={selected}
                    type="links"
                    filter="GET"
                    title="Links"
                    onChange={this._onLinksSelect}
                />;
            }
            itemsPanel = <ItemsListNav
                itemsList={folder.itemsList()}
                selected={selected}
                type="itemsList"
                filter="GET"
                title="Items"
                onChange={this._onItemsSelect}
            />;
            cmdsPanel = <ItemsListNav
                itemsList={folder.itemsCmd( folder.itemsList( selected ) )}
                selected={selected}
                type="links"
                filter="ALL"
                title="ItemCmds"
                onChange={this._onCmdsSelect}
               />;
        } else {
            let nav = folder.links();
            if ( nav !== null && nav.size > 0 ) {
                linksPanel = <ItemsListNav
                    itemsList={nav}
                    selected={selected}
                    type="links"
                    filter="ALL"
                    title="Links"
                    onChange={this._onLinksSelect}
                />;
            }
        }
        if ( this.state.msg !== null ){
            msg = ( typeof msg === 'object' ) ? JSON.stringify( this.state.msg ) : msg;
        }
        debugger;
        return(
        <div>
            <div>
                <div className="rafuip-header">
                    <Toolbar>
                        <ToolbarGroup>
                            <IconButton onTouchTap={this._home}>
                                <HomeMenu/>
                            </IconButton>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <ToolbarTitle text={this.state.rel} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <ToolbarTitle text={this.state.title}/>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <Toggle onTouchTap={this._onToggle}
                                    toggled={this.state.toggled}
                                    label="Payload Prompt"
                                    labelPosition="left" />
                        </ToolbarGroup>
                    </Toolbar>
                </div>
            </div>
            <div>
                {( this.state.busy === true ) ? showBusy : null }
            </div>
            <div className="rafuip-main-content">
                { ( linksPanel === null ) ? null :
                  <div className="rafuip-sidebar-one">
                      {linksPanel}
                  </div>
                }
                { ( itemsPanel === null ) ? null :
                  <div className="rafuip-sidebar-two">
                      <ScrollMenuBar cmds={folder.scrollCmds()} onClick={this.state.onClick}/>
                      {itemsPanel}
                  </div>
                }
                <div className="rafuip-content">
                    {msg}
                    {this._getDetails()}

                </div>

                { ( cmdsPanel=== null ) ? null :
                  <div className="rafuip-sidebar-three">
                      {cmdsPanel}
                  </div> }

            </div>
        </div>
        )
    };

  
    _getDetails = () => {
        let { folder, selected } = this.state;
        let rawContent     = null;
        let viewerContent  = null;
        let headersContent = null;
        let c;
        // let tabs = <Tabs value={this.state.tabValue} onChange={this._onTabChange} />
        switch ( folder.type ) {
            case 'links':
                c = folder.items();
                if ( c !== null ) {
                    rawContent = <JSONPretty id="json-pretty" json={c.toJS()}> </JSONPretty>;

                }
                break;
            case 'itemsList':
                if ( folder.itemsList().size > 0 ) {
                    c = folder.items( folder.itemsList( selected ), 'data' );
                    rawContent = <JSONPretty id="json-pretty" json={c.toJS()}> </JSONPretty>;
                } else {
                    rawContent = <h1> List is empty. Is that what you expected?</h1>
                }
                break;
            default:
                c = folder.items();
                if ( c !== null ) {
                    rawContent = <div>
                        <ScrollMenuBar cmds={folder.scrollCmds()} onClick={this.state.onClick}/>
                        { ( typeof c === 'object' ) ? <JSONPretty id="json-pretty" json={c.toJS()}> </JSONPretty>
                            : <div>{c} </div> }
                    </div>;
                    viewerContent = ( this.state.tabValue === 'viewer' ) ? getCustomViewer( folder ) : null;
                }
                break;
        }

        if ( this.state.tabValue === 'details' ) {
            let detail        = folder.details();
            let detailContent = ( detail === null ) ? null : <JSONPretty id="json-pretty" json={detail.toJS()}/>;
            headersContent =
                    <div>
                        <h2> Config to http call </h2>
                        <JSONPretty id="json-pretty" json={folder.config().toJS()}/>
                        <h2> Response Header </h2>
                        <JSONPretty id="json-pretty" json={folder.headers().toJS()}/>
                        <h2> Response Detail </h2>
                        {detailContent}
                    </div>;
         }


        return  (
            <Tabs value={this.state.tabValue} onChange={this._onTabChange} >
                <Tab label="Raw" value="raw">
                    {rawContent}
                </Tab>
                <Tab label="Custom Viewer" value="viewer" >
                    {viewerContent}
                </Tab>
                <Tab label="Details" value="details">
                    {headersContent}
                    </Tab>
            </Tabs>
        )

    };


    _onTabChange = ( value ) => {
        this.setState( {tabValue: value} );
    };

    _onToggle = ( e, isToggled ) => {
        this.setState( {toggled: !this.state.toggled } );
    }
    _home = () => {
        let parms = {
            route       : '/home',
            parentRoute : null,
            parentSource: null
        };
        this.props.history.push( '/home', parms );
    };

    _onItemsSelect = ( e, selected ) => {
        let { folder } = this.state;
        this.setState( { selected: selected ,
                         msg     : null,
                         content : folder.items( folder.itemsList( selected ), 'data' ) } );
    };

    _onLinksSelect       = ( e, selectedLink ) => this._handleLinkSelection( 'links', selectedLink );
    _onCmdsSelect        = ( e, selectedLink ) => this._handleLinkSelection( 'cmds', selectedLink );
    _handleLinkSelection = ( type, selectedLink ) => {
        debugger;
        let { folder } = this.state;
        let { store }  = this.context;
        let rafLink;
        if ( type === 'links' ) {
            rafLink = folder.links( selectedLink );
        } else {
            rafLink = folder.itemsCmd( folder.itemsList( this.state.selected ), selectedLink );
        }

        let method = rafLink.getIn( [ 'link', 'method' ] );
        let prompt = ( method === 'GET' || method === 'HEAD' ) ? false : true;

        if ( this.state.toggled === true ) {
            prompt = true;
        }
        if ( prompt === true ){
            let path = `/prompt`;
            let query = {
                selected    : this.state.selected,
                selectedLink: selectedLink,
                type        : type,
                route       : folder.route
            };
            this.setState( {tabValue: 'raw' } );
            this.props.history.push( path, query )
        } else {
            this.setState( {busy: true} );
            debugger;
            store.apiCall( rafLink )
                 .then( f => {
                     debugger;
                     let path = `/${f.type}`;
                     let query = {
                         route      : f.route,
                         parentRoute: folder.route,
                         routeType  : f.type
                     };
                     this.setState( {tabValue: 'raw', busy: false} );
                     this.props.history.push( path, query )
                 } )
                 .catch( err => {
                     this.setState( { msg: err , busy: false } );
                 } )
        }
    }

}
_LinksListp.contextTypes = {
    store: PropTypes.object
};

let LinksListp = withRouter( _LinksListp );
export default LinksListp  ;


