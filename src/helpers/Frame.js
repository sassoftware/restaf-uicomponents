
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

class Frame extends  React.Component {
    constructor( props ) {
        super( props );
        this.iFrame = null;
    }


    componentDidMount() {
        debugger;
        console.log( 'component mounted ' );
        this._updateFrameContent( );
    }

    componentDidUpdate() {
        debugger;
        this._updateFrameContent( );
    }


    _updateFrameContent( ) {
        debugger;

        this.iFrame.addEventListener( 'load', this._finishPreviewLoad );

        if ( !this.iFrame.contentWindow || !this.iFrame.contentWindow.document ) {
            throw new Error( 'The iFrame could not be used because it has no document object' );
        }
        debugger;
        console.log( 'updating content' );
        this.iFrame.contentWindow.document.open();
        this.iFrame.contentWindow.document.write( this.props.markup );
        this.iFrame.contentWindow.document.close();
        console.log( 'CONTENT ADDED' );
    }


    _finishPreviewLoad = ( ...args )=> {
        debugger;
        console.log( args );
        console.log( 'preview load complete' );
    };


    _saveFrame = ( el ) => {
        debugger;
        this.iFrame = el;
    };

    _frameLoad( fdoc ) {
        debugger;
        console.log( 'frame has officially loaded' );
        this._updateFrameContent( this.props.markup );
    }

    render() {
        debugger;
        return (
            <div>
                <iframe ref={ this._saveFrame} className={this.props.className} />
            </div>
        );
    }
}
export default Frame;