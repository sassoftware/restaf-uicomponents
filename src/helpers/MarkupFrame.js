
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
import ReactDOM from 'react-dom' ;

class MarkupFrame extends  React.Component {
    constructor( props ) {
        super( props );
    }


    componentDidMount() {
        debugger;
        console.log( 'component mounted ' );

        this._updateIframe( );
    }

    componentDidUpdate() {
        debugger;
        console.log( 'in componentdidupdate' );
        /* this._updateIframe( );*/
    }


    _updateIframe( ) {

         const iframe = this.refs.iframe;
         const document = iframe.contentDocument;
         const head = document.getElementsByTagName( 'head' )[ 0 ];
        /*  document.body.innerHTML = this.props.content; */
         iframe.srcdoc = this.props.content;
        debugger;

    }

    /*
     * This component renders just and iframe
     */
    render() {
        return <iframe height={this.props.height} width={this.props.width} ref="iframe"/>
    }
}
export default MarkupFrame;