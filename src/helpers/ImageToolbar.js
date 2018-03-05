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

import '../viewers/generic.css';
import React from 'react' ;

import TextField       from 'material-ui/TextField';
import RaisedButton    from 'material-ui/RaisedButton'
import IconButton      from 'material-ui/IconButton';
import NavigationMenu  from 'material-ui/svg-icons/navigation/menu';
import ArrowBack       from 'material-ui/svg-icons/navigation/arrow-back';

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Popover, {PopoverAnimationVertical}   from 'material-ui/Popover';


class ImageToolbar extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            /*

            title       : props.title,
            onResize    : props.onResize,
            toggleDrawer: props.toggleDrawer,
            appOpen     : props.appOpen,
            onAppClose  : props.onAppClose,
            */
            size   : props.size,
            popover: false,
            anchor : null
        };
    }

    _handleTouchTap = ( e ) => {
        this.setState( { popover: true, anchor: e.currentTarget } )
    };

    _handleRequestClose = () => {
        this.setState( { popover: false } );
    };

    _onChange = ( e, value ) => {
        let size = Object.assign( {}, this.state.size );
        size[e.target.id] = value;
        this.setState( { size: size } );
    };

    _applySize = ( ) => {
        debugger;
        this.setState( { popover: false } );
        this.props.onResize( this.state.size );
    };

    _onAppClose = () => {
        this.props.onAppClose();
    };

    _sizeDrop = () => {
        let { size  }  = this.state;
        let x = <div>
                    <RaisedButton label="Size..." primary={true} onTouchTap={this._handleTouchTap}/>
                    <Popover
                        open={this.state.popover}
                        anchorEl={this.state.anchor}
                        onRequestClose={this._handleRequestClose}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        animation={PopoverAnimationVertical}>
                    <div>
                        <TextField id="height" key="height" floatingLabelText="Height" value={size.height}
                                   disabled={false} style={{ width: 100 }} onChange={this._onChange}/>
                        <br/>
                        <TextField id="width" key="width" floatingLabelText="Width" value={size.width}
                                   disabled={false} style={{ width: 100 }} onChange={this._onChange}/>
                        <br/>
                        <RaisedButton label="Apply" primary={true} onTouchTap={this._applySize}/>
                     </div>
            </Popover>
        </div>;
        return x;
    };

    render() {
        let { title, toggleDrawer, appOpen } = this.props;
        debugger;
        let appButton = <div>
                           <IconButton onTouchTap={this._onAppClose}>
                               <ArrowBack/>
                           </IconButton>
                         </div>;
        let show = ( appOpen === true ) ? appButton : this._sizeDrop() ;
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <IconButton onTouchTap={toggleDrawer}>
                            <NavigationMenu/>
                        </IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text={title}/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {show}
                    </ToolbarGroup>

                </Toolbar>
            </div>
        );

    }
}



export default ImageToolbar;

