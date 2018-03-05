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
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import makeSelectable from 'material-ui/List/makeSelectable';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

function ItemsListNav ( props ) {
    let { itemsList, onChange, selected, type, filter, title} = props;
    let  SelectableList   = makeSelectable( List );
    debugger;

    if ( itemsList === null ) {
        return null;
    }

    let listArray = ( type === 'links' ) ? loopThruMap( itemsList, selected , filter )
                                         : loopThruList( itemsList, selected );
    return ( listArray.length  === 0 ) ? null :
        <div>
            <SelectableList value={ selected } onChange={ onChange }>
                <Subheader> {title} </Subheader>
                <Divider />
                {listArray}
            </SelectableList>
        </div>

}

function loopThruList ( itemsList, selected ) {
    let t = [];
    t =  itemsList.map( ( v, k ) => {
        return <ListItem key={ k } value={ k } primaryText={ v.trim() }
                         leftIcon={ ( selected === k ) ? <ChevronRight /> : null }
                         disabled={ false }/>
    } );
    return t;
}

function loopThruMap ( links, selected, filter ) {
    let t = [];
    links.forEach ( ( v, k ) => {
        let add = true;
        let method = v.getIn( [ 'link', 'method' ] );

        switch( filter ){
            case 'GET':
                if ( method !== 'GET' ) {
                   add = false;
                }
                break;
            case 'NONGET':
                if ( method === 'GET' ){
                   add = false;
                }
                break;
            default:
                break;
        }

        if ( add ) {
            let text = ( v.getIn( [ 'link', 'extended' ] )  ) ? `*${k}` : k;
            let uri  = v.getIn( [ 'link', 'uri' ] );
            let x = <ListItem key={ k } value={ k } primaryText={ text.trim() } tooltip={uri}
                              leftIcon={ ( selected === k ) ? <ChevronRight /> : null }
                              disabled={ false }/>;
            t.push( x );
        }
    } );

    return t;
}
export default ItemsListNav ;