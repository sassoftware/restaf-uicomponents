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

import PlaceHolder    from '../viewers/Placeholder';
import LinksListp     from '../viewers/LinksListp';
import ItemsArrayp    from '../viewers/ItemsArrayp';
import ServicePromptp from '../viewers/ServicePromptp';

function gotoNextViewer ( path, folder ) {

    let NextPath;
    switch ( path ) {
        case '/':
            NextPath = ServicePromptp;
            break;

        case '/links'     :
        case '/itemsList' :
            NextPath = LinksListp;
            break;

        case '/itemsArray':
        case '/items'     :
            NextPath = secondaryViewer( folder );

            break;

        case '/data': {
            NextPath = PlaceHolder;
            break;
        }

        default:
            NextPath = PlaceHolder;
    }
    return NextPath;
}

function secondaryViewer( folder ) {
    return null;
}
export default gotoNextViewer ;