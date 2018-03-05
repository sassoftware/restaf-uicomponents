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
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import gotoNextViewer from '../helpers/gotoNextViewer';
import PlaceHolder from '../viewers/Placeholder';
import LinksListp from '../viewers/LinksListp';
import ItemsArrayp from '../viewers/ItemsArrayp';

class _Explorep extends React.Component {
    constructor( props ) {
        debugger;
        super( props );
        this.state = {
            route: props.route
        };
    }

    componentWillMount() {
        debugger;
        let rafObject  = this.context.store.rafObject( this.state.route );

        let path   = `/${rafObject.type}`;
        let search = {
            route      : this.state.route,
            parentRoute: null,
            routeSource: rafObject.type
        };

        this.setState( { rafObject: rafObject } );
        this.props.history.push( path, search  );
    }
    render() {
        debugger;
        let nextProps = this.props.history.location.state;
        return  <BrowserRouter>
            <div>
                <Switch>
                    <Route exact={true} path="/"            component={PlaceHolder} />
                    <Route exact={true} path="/links"       component={LinksListp} />
                    <Route exact={true} path="/itemsList"   component={LinksListp} />
                    <Route exact={true} path="/itemsArray"  component={ItemsArrayp} />
                    <Route exact={true} path="/data"        component={ItemsArrayp} />
                </Switch>

            </div>
        </BrowserRouter>;
    }
}

_Explorep.contextTypes = {
    store: PropTypes.object
};
let Explorep = withRouter( _Explorep );
export default Explorep  ;


