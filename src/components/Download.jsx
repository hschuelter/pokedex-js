import React from 'react';
import { saveAs } from 'file-saver';

const Download = () => {
	const handleDownload = async () => {
		let content = 'hello'
		const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
		saveAs(file, fileName);
	};

	return (
		<button onClick={handleDownload}>
			Download
		</button>
	);
};

export default Download;