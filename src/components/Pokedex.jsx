import React from 'react';
import {forwardRef, useImperativeHandle, useRef} from 'react';


import PokeInfo from './PokeInfo';
import { IconButton, Paper } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import SearchIcon from '@mui/icons-material/Search';


function Pokedex ({ data }) {
    var dataList = [];
    var pokemonList = [];
    const refList = [];
    const [searchValue, setSearchValue] = React.useState('');


    const onClick = () => {
        refList.map((item) => {
            item.current.showIt();
        });
    };

    const handleSearchChange = event => {
        var searching = event.target.value;
        setSearchValue(searching);

        
        for (var i = 0; i < pokemonList.length; i++) {
            var inlcudesInName = pokemonList[i].props.name.indexOf(searching.toLowerCase()) >= 0;
            var includesInType = false;

            pokemonList[i].props.types.map( (type) => {
                if (type.indexOf(searching.toLowerCase()) >= 0){
                    includesInType = true;
                }
            });

            if (inlcudesInName || includesInType) {
                refList[i].current.showIt();
            } 
            else {
                refList[i].current.hideIt();
            }
        }
    };

    for (let i = 0; i < data.length; i++){
        refList.push(useRef());
        data[i].number = i + 1;
        dataList.push(data[i]);
        pokemonList.push(
            <PokeInfo
                number = {data[i].number}
                name = {data[i].name}
                types = {data[i].types} 
                height = {data[i].height} 
                weight = {data[i].weight} 
                abilities = {data[i].abilities} 
                ref = {refList[i]} />
        );
    }

	return (
        <div>
            <div>
                <Paper className="search-area" elevation={3}>
                    <input value={searchValue} onChange={handleSearchChange} name="search" type="text" placeholder='Search'/>
                    <IconButton aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <IconButton aria-label="reset" onClick={onClick}>
                        <UndoIcon />
                    </IconButton>
                </Paper>
            </div>

            <div className="pokedex">
                {pokemonList.map((item) => item)}
            </div>
        </div>
	);
}

export default Pokedex;