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
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import makeSelectable from 'material-ui/List/makeSelectable';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

function LinkNav ( props ) {

    let { itemsList, onChange, selected } = props;
    let  SelectableList   = makeSelectable( List );

    debugger;
    let listArray = loopThru( itemsList, selected  );

    return (
        <div>
            <SelectableList  value={ selected } onChange={ onChange }>
                {listArray}
            </SelectableList>
        </div>
    );
}

function loopThru ( itemsList, selected ) {

    return itemsList.map ( ( v, k ) => {
        return <ListItem key={ k } value={ k } primaryText={ v.trim() }
                      leftIcon={ ( k === selected ) ? <ChevronRight /> : null }
                      disabled={ false }/>

    } );

}
export default LinkNav ;