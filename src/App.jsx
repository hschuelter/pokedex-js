// npm run dev
import './App.css'
import './css/style.css'

import pokedexData from '../data/poke.json';

import Pokedex from './components/Pokedex';

function App() {
	return (
	<>
		<header>
			<code>pokedex-js</code>
		</header>

		<Pokedex 
			data = {pokedexData}
			/>
	</>
	)
}

export default App
