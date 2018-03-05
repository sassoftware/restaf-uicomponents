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

function CASOutputNav ( props ) {

    let { data, onChange, selected } = props;
    let  SelectableList   = makeSelectable( List );

   debugger;
    let listArray = loopThru( data, selected  );

   return (
        <SelectableList  value={ selected } onChange={ onChange }>
            {listArray}
        </SelectableList>
   );
}

function loopThru ( data, selected ) {
    let r = [];
    data.forEach ( ( v, k ) => {
        let t;
        let leftIcon = ( k === selected ) ? <ChevronRight /> : null;
        if ( k == 'tables' ) {
            t = <ListItem key={ k } value={ k } primaryText={ k.trim() }
                          leftIcon={ leftIcon }
                          nestedItems={tableList( v, selected )}
                          disabled={ false }/>
        } else {
            t = <ListItem key={ k } value={ k } primaryText={ k.trim() }
                          leftIcon={ leftIcon }
                          disabled={ false }/>
        }
        r.push( t );
        } );
    return  r ;
}

function tableList( table, selected ) {
    let r = [];
    table.forEach( ( v, k ) => {
        let value = `tables:${k}`;
        let leftIcon = ( value === selected ) ? <ChevronRight /> : null;
        let t =  <ListItem key={ k } value={ value } primaryText={ k }
                           leftIcon={ leftIcon }
                           disabled={ false }/>;
        r.push( t );
    } );

    return r;
}

export default CASOutputNav ;