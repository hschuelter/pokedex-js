import React from 'react';
import {forwardRef, useImperativeHandle, useRef} from 'react';
import {useEffect} from 'react';

import Type from './Type';

import { Box, Grid, CircularProgress  } from '@mui/material';

function calculateWidth (baseStat, total) {
    return (baseStat / total) * 100 + '%';
}

function chooseBackgroundColor (baseStat, total) {
    var percentage = (baseStat / total);

    if (percentage < 0.3) {
        return '#ff5757';
    }
    if (percentage < 0.6) {
        return '#ffdd57';
    }
    if (percentage < 0.9) {
        return '#a0e515';
    }
    if (percentage >= 0.9) {
        return '#00c2b8';
    }

}

function formatAbilities (abilities) {
    var formattedAbilities = [];

    abilities.map( (ability) => {
        var abilityName = "";
        if (ability.name.indexOf('-') > 0) {
            var words = ability.name.split('-');
            for (var i = 0; i < words.length; i++){
                words[i] = (words[i][0].toUpperCase() + words[i].substr(1).toLowerCase());
            }
            abilityName = words.join(' ')
        }
        else {
            abilityName = ability.name[0].toUpperCase() + ability.name.substr(1).toLowerCase()
        }

        if (ability.is_hidden) {
            abilityName += ' (hidden ability)';
        }
        
        formattedAbilities.push(abilityName);
    });


    return formattedAbilities;
}


function DetailedInfo ({ number, name, types, height, weight, abilities }) {
    let img_src = './img/' + number + '.png';
    let pokemonSpecies = name.charAt(0).toUpperCase() + name.slice(1);
    const total = 255;
    
    var formattedAbilities = formatAbilities(abilities);
    
    const [stats, setStats] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    
    const getBaseStats = async () => {
        try {
            setIsLoading(true);
            var url = "https://pokeapi.co/api/v2/pokemon/" + number;
            const response = await fetch(url);
            const data = await response.json();
            setStats(data.stats)
        
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }; 

    useEffect(() => {
        getBaseStats();
      }, []);


	return (
        <div>
            {isLoading ? 
                <div className="loading-info">
                    <div className="loading-progress"> 
                        <CircularProgress size={60} color={'secondary'} /> 
                    </div>
                </div> :
                <div className="detailed-info">    
                    <div className="pokemon-name">{pokemonSpecies}</div> 
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <div className="pokemon-sprite"> <img src={img_src}/> </div>
                                </Grid>
                                <Grid item xs={3}>
                                    {/********************* POKEDEX DATA *********************/}
                                    <h2>Pokédex data</h2>
                                    <div className="row">
                                        <div className="title"> National № </div>
                                        <div className="value"> #{number} </div>
                                    </div>
                                    <div className="row">
                                        <div className="title"> Type </div>
                                        <div className="value"> 
                                            { types.map((item) => 
                                                <Type type = {item}/>
                                            )} 
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="title"> Height </div>
                                        <div className="value"> {(height/10).toFixed(1)} m </div>
                                    </div>
                                    <div className="row">
                                        <div className="title"> Weight </div>
                                        <div className="value"> {(weight/10).toFixed(1)} kg </div>
                                    </div>
                                    <div className="row">
                                        <div className="title"> Abilities </div>
                                            <div className="value">
                                                { formattedAbilities.map( (abilityName) => 
                                                    <div className="value"> {abilityName} </div>
                                                )}
                                            </div>
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    {/********************* BASE STATS *********************/}
                                    <h2>Base stats</h2>
                                    <div className="table-row">
                                        <div className="title"> HP </div>
                                        <div className="value"> {stats[0].base_stat} </div>
                                        <div className="horizontal-bar"> 
                                            <div className="value-bar" 
                                                style={{
                                                    width: calculateWidth(stats[0].base_stat, total),
                                                    backgroundColor: chooseBackgroundColor(stats[0].base_stat, total)
                                                    }}/> 
                                        </div>
                                        <div className="value"> {total} </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="title"> Attack </div>
                                        <div className="value"> {stats[1].base_stat} </div>
                                        <div className="horizontal-bar"> 
                                            <div className="value-bar" 
                                                style={{
                                                    width: calculateWidth(stats[1].base_stat, total),
                                                    backgroundColor: chooseBackgroundColor(stats[1].base_stat, total)
                                                    }}/> 
                                        </div>
                                        <div className="value"> {total} </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="title"> Defense </div>
                                        <div className="value"> {stats[2].base_stat} </div>
                                        <div className="horizontal-bar"> 
                                            <div className="value-bar" 
                                                style={{
                                                    width: calculateWidth(stats[2].base_stat, total),
                                                    backgroundColor: chooseBackgroundColor(stats[2].base_stat, total)
                                                    }}/> 
                                        </div>
                                        <div className="value"> {total} </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="title"> Sp. Atk </div>
                                        <div className="value"> {stats[3].base_stat} </div>
                                        <div className="horizontal-bar"> 
                                            <div className="value-bar" 
                                                style={{
                                                    width: calculateWidth(stats[3].base_stat, total),
                                                    backgroundColor: chooseBackgroundColor(stats[3].base_stat, total)
                                                    }}/> 
                                        </div>
                                        <div className="value"> {total} </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="title"> Sp. Def </div>
                                        <div className="value"> {stats[4].base_stat} </div>
                                        <div className="horizontal-bar"> 
                                            <div className="value-bar" 
                                                style={{
                                                    width: calculateWidth(stats[4].base_stat, total),
                                                    backgroundColor: chooseBackgroundColor(stats[4].base_stat, total)
                                                    }}/> 
                                        </div>
                                        <div className="value"> {total} </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="title"> Speed </div>
                                        <div className="value"> {stats[5].base_stat} </div>
                                        <div className="horizontal-bar"> 
                                            <div className="value-bar" 
                                                style={{
                                                    width: calculateWidth(stats[5].base_stat, total),
                                                    backgroundColor: chooseBackgroundColor(stats[5].base_stat, total)
                                                    }}/> 
                                        </div>
                                        <div className="value"> {total} </div>

                                    </div>
                                    <div className="table-row">
                                        <div className="title"> Total </div>
                                        <div className="value bold"> 
                                            {stats[0].base_stat + stats[1].base_stat + stats[2].base_stat + stats[3].base_stat + stats[4].base_stat + stats[5].base_stat} 
                                        </div>
                                        <div className="horizontal-bar"> </div>
                                    </div>
                                    {/*  */}
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
            }  
        </div>      
	);
}

export default DetailedInfo;