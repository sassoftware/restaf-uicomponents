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
import PropTypes from 'prop-types';
import RaisedButton  from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import HomeMenu  from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/github';
import LinearProgress from 'material-ui/LinearProgress';

class Promptp extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            text    : '',
            folder  : null,
            mode    : 'javascript',
            button  : 'Run',
            lines   : 20,
            theme   : ( props.hasOwnProperty( 'theme' ) ) ? props.theme : 'github',
            upload  : null,
            msg     : 'Enter header, qs and data as needed',
            fileList: null,
            busy    : false,
            err     : null,
            infile  : null,
            open    : false,
            title   : '',
            menuItem: " "
        };

        this.state.text = "return ( { \n"   +
                    "data  : {},\n"   +
                    "qs    : {}, \n " +
                    "headers: {},\n"  +
                    "action: ' ', \n" +
                    ' \n' +
                    "} );";

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
        let href   = folder.config( 'input', 'link', 'href' );
        let rel    = props.location.state.selectedLink;
        let title  = `Payload for: ${rel}`;
        this.setState( { folder: folder, title: title, err: null } );
    };

    _readFile = ( ) => {
        debugger;
        let file   = this.refs.file.files[0];
        let reader = new FileReader();

        reader.onload = ( evt ) => {
            this.setState( { text: evt.target.result } );
        };

        reader.readAsText( file );


    };

    _uploadFile = ( ) => {
        debugger;
        let f = this.refs.upload.files[ 0 ];
        this.setState( { fileList: ( f === undefined ) ? null : this.refs.upload.files[ 0 ] } );
    };

    render() {
        let EditorProps = {
            mode    : this.state.mode,
            minLines: this.state.lines,
            maxLines: this.state.lines * 2,
            value   : this.state.text,
            theme   : this.state.theme,
            cursor  : 2,

            vScrollBarAlwaysVisible: true
        };

        let showBusy =  <LinearProgress mode="indeterminate"/>;
        let err = this.state.err;
        if ( err !==null ) {
           if ( typeof err === 'object' ) {
              err = JSON.stringify( err, null, 4 );
           }
        }

        let uploadStyle = ( this.state.fileList === null ) ? 'upload' : `upload ${this.state.fileList.name}` ;

        return (
            <div className="rafuip-main-content">

                <div className="rafuip-content">
                    <div>
                        <div>
                            <div className="rafuip-header">
                                <Toolbar>
                                    <ToolbarGroup>
                                        <IconButton onTouchTap={this._home}>
                                            <HomeMenu/>
                                        </IconButton>
                                        <RaisedButton
                                            containerElement="label" label="Open">
                                            <input id="f" type="file" ref="file" style={{display: "none"}} onChange={this._readFile}/>
                                        </RaisedButton>
                                        <RaisedButton
                                            containerElement="label" label={uploadStyle}>
                                            <input id="u" type="file" ref="upload" style={{display: "none"}} onChange={this._uploadFile}/>
                                        </RaisedButton>
                                        <RaisedButton label="run" onClick={this._onSave} primary={true}>
                                        </RaisedButton>
                                    </ToolbarGroup>
                                    <ToolbarGroup>
                                        <ToolbarTitle text={this.state.title}/>
                                    </ToolbarGroup>
                                </Toolbar>
                            </div>
                        </div>
                        </div>
                        <div>
                        {( this.state.busy ) ? showBusy : null }
                            <pre>
                            {err}
                            </pre>
                        </div>
                        <div>
                            <AceEditor onChange={this._onChange } {...EditorProps} />
                        </div>

                    </div>

            </div>

        )
    }

    _home = () => {
        let parms = {
            route       : '/home',
            parentRoute : null,
            parentSource: null
        };
        this.props.history.push( '/home', parms );
    };

    _onChange = ( text ) => {
        this.setState( {text: text} );
    };
    _onSave = () => {
        createPayload( this.state.text, this.state.fileList,  ( err, payload ) => {
            if ( err ) {
                console.log( err );
                this.setState( { err: err } );
            } else {
                let { folder } = this.state;
                this.setState( { busy: true, err: null } );
                let query = this.props.location.state;
                let rafLink;
                if ( query.type === 'links' ) {
                    rafLink = folder.links( query.selectedLink );
                } else {
                    rafLink = folder.itemsCmd( folder.itemsList( query.selected ), query.selectedLink );
                }
                debugger;
                this.context.store.apiCall( rafLink, payload )
                    .then( f => {
                        debugger;
                        let path = `/${f.type}`;
                        let q = {
                            route      : f.route,
                            parentRoute: folder.route,
                            routeType  : f.type
                        };
                        this.setState( { busy: false } );
                        this.props.history.push( path, q )
                    } )
                    .catch( err => {
                        debugger;
                        this.setState( { err: err, busy: false } );
                    } )
            }
        } )

    }
}

function createPayload( text, uploadFile, cb ) {
    try {
        //noinspection DynamicallyGeneratedCodeJS
        let payload = ( text.length > 0 ) ? new Function( text )() : null;
        if ( payload === null ) {
            cb ( null, null );
        } else {
            if ( uploadFile !== null ) {
                payload.data = uploadFile;
            }
            cb( null, payload );
        }
    }
    catch ( err ) {
        debugger;
        let e = {syntaxError: `${err}`};
        console.log( e );
        cb( e );
    }
}
Promptp.contextTypes = {
    store: PropTypes.object
};

export default Promptp;