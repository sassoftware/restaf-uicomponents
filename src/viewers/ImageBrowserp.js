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

import './generic.css';
import React from 'react';

import Drawer       from 'material-ui/Drawer';
import ItemsListNav from '../helpers/ItemsListNav';
import ImageToolbar from '../helpers/ImageToolbar';
import TextField    from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import SVGInline from 'react-svg-inline';

import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import OpenInBrowser     from 'material-ui/svg-icons/action/open-in-browser';


// import MarkupFrame  from  '../helpers/MarkupFrame';
import ReactFrame  from  '../helpers/ReactFrame';

class ImageBrowserp extends React.Component {
    constructor( props ) {
        debugger;
        super( props );
        //
        // TBD: Check memory leak on binds
        this.state = {
            store       : props.store,
            reportList  : props.reportsList,
            imageService: props.imagesService,
            host        : props.host,
            aspectRatio : ( props.hasOwnProperty( 'aspectRatio' ) === true ) ? props.aspectRation: 'xMidYMid meet',
            drawerOpen  : true,
            selected    : -1,
            reportHtml  : null,
            image       : null,
            details     : null,
            imageJob    : null,
            currentPage : 1,
            sectionName : null,
            busy        : false,
            appOpen     : false,

            size: {
                width : 400,
                height: 400
            }

        };
    }
    componentWillReceiveProps( ) {
        debugger;
        this.setState( { reportHtml: null } );
    }
    render() {
       return  this._renderMain();
    }

    _renderMain() {
        debugger;
        let { reportList } = this.state;
        let title   = 'RAF at work';
        if ( this.state.selected >= 0 ) {
            title = reportList.itemsList( this.state.selected );
        }
        let showBusy = <LinearProgress mode="indeterminate"/>;
        let main;
        if ( this.state.appOpen === false ) {
            main = <div className="wrapper-2">
                <div>
                    <h2> {title} </h2>
                    <TextField id="page" ref="page" key="page" floatingLabelText="Goto Section"
                               value={this.state.currentPage}
                               disabled={false} style={{ width: 100 }} onChange={this._onPageChange}/>
                    <IconButton onTouchTap={this._newPage}>
                        <MapsDirectionsRun/>
                    </IconButton>
                    <IconButton onTouchTap={this._onReportHtml}>
                        <OpenInBrowser/>
                    </IconButton>
                </div>
                <div id="xyz_1" className="xyz-1">
                    <div>
                        {( this.state.busy === true ) ? showBusy : null }
                    </div>
                    <div>
                        {this._item()}
                    </div>
                </div>
            </div>
        } else {
            main = <div className="wrapper-2" >
                      <div>
                         <ReactFrame content={this.state.reportHtml} height={this.state.size.height}
                             width={this.state.size.width} />
                      </div>
                  </div>;
        }
        return (

            <div>
                <Drawer open={this.state.drawerOpen}>
                    <ItemsListNav itemsList={reportList.itemsList()} selected={this.state.selected}
                                  onChange={this._onChange} style={{ width: 300 }}/>
                </Drawer>
                <div className="wrapper-1">
                    <div className="headerx">
                        <ImageToolbar size={this.state.size}
                                      onResize={this._onResize}
                                      toggleDrawer={this._toggleDrawer}
                                      appOpen={this.state.appOpen}
                                      onAppClose={this._onAppClose}
                                      title={ "VA Report Image Browser" }
                        />
                    </div>
                </div>
                {main}
            </div>

        );
    }

    //
    // save page value
    //
    _onPageChange = ( e, value ) => {
        this.setState( { currentPage: value } );
    };

    //
    // set toggle on
    //
    _toggleDrawer = () => {
        this.setState( { drawerOpen: !this.state.drawerOpen } )
    };


    _onReportHtml = () => {
        debugger;
        let repLink;
        let { reportList } = this.state ;
        let href =  reportList.itemsCmd( reportList.itemsList( this.state.selected ), 'self', 'link', 'href' );
        href     = `${href}&page=${this.state.sectionName}&appSwitcherDisabled=true&reportViewOnly=true`;
        repLink  = `${this.props.host}/SASReportViewer/?reportUri=${href}`;
        window.open( repLink );

    };


   _onAppClose = () => {
       this.setState( { appOpen: false, reportHTML: null } );
   };

    _onResize = ( size ) => {
        this.setState( { size: size , busy: true } );
        this._showSelectedReport( this.state.selected, size );
    };

    _newPage = () => {
        let value = this.refs.page.getValue();
        let newPage;
        let currentPage = this.state.currentPage;
        if ( value.length === 0 ) {
            newPage = 1;
        } else {
            newPage = parseInt( value );
            if ( isNumber( newPage ) ) {
                if ( newPage <= 0 ) {
                    newPage = currentPage;
                }
            }
        }
        this.setState( { currentPage: newPage, busy: true } );
        this._showSelectedReport( this.state.selected );

    };


    //
    // default payload to get images
    //
    _imagePayload = ( reportsList, s, size  ) => {
        let uri     = reportsList.itemsCmd( reportsList.itemsList( s ), 'self', 'link', 'uri' );
        //
        // setState might not have taken effect
        // so using override of size in the case of resize
        //

        let imgSize = ( size != null ) ?  `${size.height}x${size.width}`
                                       :   `${this.state.size.height}x${this.state.size.width}`;

        return {
            data: {
                reportUri   : uri,
                layoutType  : 'entireSection',
                size        : imgSize,
                sectionIndex: this.state.currentPage - 1
            }
        };
    };

    //
    // Process the user selection in the navigator
    //

    _onChange = ( e, s ) => {
        this.setState( { currentPage: 1, drawerOpen: false, busy: true, reportHtml: null } );
        this._showSelectedReport( s );
    };


    //
    // Display the current result
    //
    _item = () => {
        if ( this.state.selected === -1 ) {
            return <div><h2> Please select a report to view the images. restAF at work...</h2></div>
        } else {
            let im = null;
            debugger;
            if ( this.state.image !== null ) {

                let t = { __html: this.state.image };
                im = <div ref="svgmain" dangerouslySetInnerHTML={t}/>;
                /*
                im = <div> <SVGInline  ref="vaimage" svg={this.state.image} /> </div> ;

               im =  <div>
                    <svg ref="svgmain" >{this.state.image} preserveAspectRatio={this.state.aspectRatio} </svg>
                </div>
                */

            } else {
                let t = ( typeof this.state.details === 'object' )
                    ? JSON.stringify( this.state.details, null, 4 )
                    : this.state.details;
                im = <div>
                    <pre className="prettyprint"> { t } </pre>
                </div>;
            }
            return im;
        }

    };
    //
    // Get the image for the selected item
    //

    _showSelectedReport = ( s , size ) => {
        let payload = this._imagePayload( this.state.reportList, s , size );
        this._getImage( payload, ( err, results ) => {
            this.setState(
                {
                    selected   : s,
                    image      : ( err ) ? null : results.svg,
                    details    : err,
                    imageJob   : ( err === null ) ? results.imageJob : null,
                    sectionName: ( err === null ) ? results.sectionName : null,
                    busy       : false
                } );
        } )

    };

    _getImage = ( payload, cb ) => {
        let { store, imageService } = this.state;
        let imageJob    = null;
        let sectionName = null;
        debugger;
        store.apiCall( imageService.links( 'createJob' ), payload )
             .then( job => store.jobState( job, null, 5 ) ) /*  default long poll times, max tries = 5  */
             .then( status => {
                 if ( status.data !== 'complete' ) {
                     return status.job;
                 } else {
                     throw { Error: `Job did not complete:  ${status.data}` };
                 }
             } )
             .then( newJob => {
                 imageJob = newJob;
                 sectionName = newJob.items( newJob.itemsList( 0 ), 'data', 'sectionName' );
                 return store.apiCall( newJob.itemsCmd( newJob.itemsList( 0 ), 'image' ) )
             } )
             .then( image => {
                 cb( null, { imageJob: imageJob, sectionName: sectionName,  svg: image.items() } )
             } )
             .catch( err => {
                 cb( err, null )
             } )
    };


}

function isNumber( n ) {
    return !isNaN( parseFloat( n ) ) && isFinite( n );
}

export default ImageBrowserp ;

