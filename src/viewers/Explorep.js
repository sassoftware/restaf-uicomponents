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
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import PropTypes from 'prop-types'

import IconButton      from 'material-ui/IconButton';
import HomeMenu  from 'material-ui/svg-icons/action/home';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

// import gotoNextViewer from '../helpers/gotoNextViewer';
import ServicePromptp from '../viewers/ServicePromptp';
import LinksListp from '../viewers/LinksListp';
import Promptp from '../viewers/Promptp';

class _Explorep extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            title: 'Explorer'
        }
    }
    componentWillMount() {
        this.props.history.push( '/home' );
    }
    componentWillReceiveProps( nextProps ) {
    }
    //TBD: Simplify this with a render option of Route
    render () {
        debugger;
        return (
            <BrowserRouter>
                    <Switch>
                        <Route exact={true} path="/home"        component={ServicePromptp} />
                        <Route exact={true} path="/links"       component={LinksListp} />
                        <Route exact={true} path="/itemsList"   component={LinksListp} />
                        <Route exact={true} path="/itemsArray"  component={LinksListp} />
                        <Route exact={true} path="/items"       component={LinksListp} />
                        <Route exact={true} path="/data"        component={LinksListp} />
                        <Route exact={true} path="/prompt"      component={Promptp} />
                     </Switch>
             </BrowserRouter>
        )
    }

    _home = ( ) => {
        let parms = {
            route       : '/home',
            parentRoute : null,
            parentSource: '/home'
        }
        this.props.history.push( '/home', parms );
    }
}

_Explorep.contextTypes = {
    store: PropTypes.object
};

let Explorep = withRouter( _Explorep );
export default Explorep  ;
