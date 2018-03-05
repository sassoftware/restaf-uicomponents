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
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom' ;

function RouterTest ( props, elementId  ) {

    debugger;

    const Next = ( props ) => {
        debugger;
        return (
            <div id="visuals">
                <h2>Next</h2>
                <Link to="/" replace > Return To Home </Link>
            </div>
        )
    };


    let l = <BrowserRouter>
              <div>
                  <Route path="/" render={ props => {
                      debugger;
                      console.log( props.location );
                      let { location, match } = props;
                      let l = null;
                      if ( match.isExact || location.pathname !== '/next' ) {
                          l = <div>
                              <h1> Home </h1>
                              <Link to="/next" replace> Go To Next </Link>
                          </div>
                      }
                      return l;
                  } } />
                  <Route path="/next" component={Next} />
              </div>
           </BrowserRouter>;

    ReactDOM.render( l, document.querySelector( elementId ) );
}


export default RouterTest;