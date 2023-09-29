import React from 'react';
import {forwardRef, useImperativeHandle, useRef} from 'react';

import Type from './Type';
import { Button, Modal } from '@mui/material';


import DetailedInfo from './DetailedInfo';

const PokeInfo = forwardRef(({ number, name, types, height, weight, abilities }, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let img_src = './img/' + number + '.png';
    let pokemonSpecies = name.charAt(0).toUpperCase() + name.slice(1);

    const [showResults, setShowResults] = React.useState(true);

    
    useImperativeHandle(ref, () => ({
        hideIt() {
            setShowResults(false);
            setOpen(false);
        },
        showIt() {
            setShowResults(true);
            setOpen(false);
        },
    }));

    const clickToClose = () => {
        setShowResults(false);
    };


	return (
        <div>
            { !showResults ? null :
                <div className="pokemon-info" onClick={handleClickOpen}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div>
                            <DetailedInfo 
                                number = {number}
                                name = {name}
                                types = {types} 
                                height = {height} 
                                weight = {weight} 
                                abilities = {abilities} 
                            />
                        </div>
                    </Modal>


                    <div className="close" onClick={clickToClose} />
                    <div className="pokemon-sprite"> <img src={img_src}/> </div>
                    <div className="pokemon-name"> {pokemonSpecies} </div>
                    <div className="pokemon-types">
                        { types.map((item) => 
                            <Type type = {item}/>
                        )}
                        
                    </div> 
                </div>
            }
        </div>
	);
});

export default PokeInfo;