import React from 'react';

function Type ({ type }) {
    let className = "type-icon type-" + type;
	return (
        <div className={className}> {type} </div>
	);
}

export default Type;