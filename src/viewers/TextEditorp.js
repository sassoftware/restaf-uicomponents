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
import RaisedButton  from 'material-ui/RaisedButton';

import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/twilight';
import 'brace/theme/github';
import LinearProgress from 'material-ui/LinearProgress';

require( './editor.css' );

class TextEditorp extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            text    : props.text,
            onRun   : props.onRun,
            mode    : props.mode,
            button  : props.button,
            lines   : ( props.lines == null ) ? 20 : props.lines,
            theme   : ( props.theme == null ) ? 'twilight' : props.theme,
            upload  : props.upload,
            msg     : props.msg,
            err     : null,
            fileList: null,
            busy    : false
        };
    }
    _readFile = ( ) => {
        debugger;
        let file = this.refs.file.files[0];
        let reader = new FileReader();
        reader.onload = ( evt ) => {
            this.setState( { text: evt.target.result } );
        };
        reader.readAsText( file );

    };

    _uploadFile = ( ) => {
        debugger;
        this.setState( { fileList: this.refs.upload.files[ 0 ] } );
    };

    render() {
        let EditorProps = {
            mode    : this.state.mode,
            minLines: this.state.lines,
            maxLines: this.state.lines * 2,
            value   : this.state.text,
            theme   : this.state.theme,
            cursor  : 2
        };
        let fileDialog   =  <input id="f" type="file" ref="file" onChange={this._readFile}/>;
        debugger;
        let upDialog = null;
        if (  this.state.upload === true ) {
            upDialog = <div>
                    <p> Select file to be uploaded( for upload action ) </p>
                    <div>
                       </div><input id="u" type="file" ref="upload" onChange={this._uploadFile}/>
                    </div>;
        }
            debugger;
        let showBusy = <LinearProgress mode="indeterminate"/>;
        return (
            <div className="flex-container">
                <div className="child1" >
                    <div>
                        <div>
                            {fileDialog}
                        </div>
                        <div>
                            <AceEditor onChange={this._onChange } {...EditorProps} />
                        </div>

                        <div>
                            {upDialog}
                        </div>
                        <div>
                          {( this.state.busy === true ) ? showBusy : null }
                        </div>

                        <div className="child2">
                            <h4> {this.state.msg} </h4>
                            <RaisedButton
                                label={this.state.button}
                                key={1}
                                primary={true}
                                ref="RUN"
                                style={ { margin: 12 } }
                                onTouchTap={this._onSave}
                            />
                            {this.state.err}
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }

    _onChange = ( text ) => {
        this.setState( {text: text} );
    };
    _onSave = () => {
        this.setState( {busy: true} );
        this.props.onRun( this.state.text, this.state.fileList, ( status ) => {
            this.setState( { busy: false } );
        } )
    };
}


export default TextEditorp;