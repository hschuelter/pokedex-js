import React from 'react';
import {forwardRef, useImperativeHandle, useRef} from 'react';

import Type from './Type';
import { Button, Modal } from '@mui/material';

import DetailedInfo from './DetailedInfo';

const PokeInfo = forwardRef(({ number, name, types, height, weight, abilities }, ref) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    let img_src = '../static/images/' + number + '.png';
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
                <>
                    <div className="pokemon-info" onClick={handleClickOpenModal}>
                        <div className="close close-mark" onClick={clickToClose}></div>
                        <div className="pokemon-sprite"> <img src={img_src}/> </div>
                        <div className="pokemon-name"> {pokemonSpecies} </div>
                        <div className="pokemon-types">
                            { types.map((item) => 
                                <Type type = {item}/>
                            )}
                            
                        </div> 
                    </div>

                    <Modal
                        open={open}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
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
                </>
            }
        </div>
	);
});

export default PokeInfo;