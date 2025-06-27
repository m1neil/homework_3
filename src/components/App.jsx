import CentimeterConverter from './CentimeterConverter'
import CompetitionManager from './CompetitionManager/CompetitionManager'
import DancingManager from './DancingManager/DancingManager'
import Sapper from './Sapper'
import Speedometer from './Speedometer'
import Thermometer from './Thermometer'
import DynamicSearch from './DynamicSearch'
import SearchCars from './SearchCars'
import Translator from './Translator'
import ChainStores from './ChainStores/ChainStores'
import {
	cells,
	listCandidates,
	boys,
	girls,
	employees,
	cars,
	words,
	products,
	stores
} from '../data';
import { useState } from 'react'

function App() {
	const [tabIndex, setTabIndex] = useState(() => {
		const tabIndex = localStorage.getItem('tab-index') ?
			parseInt(localStorage.getItem('tab-index')) : 0
		return tabIndex
	})


	const buttons = [
		'Task 1',
		'Task 2',
		'Task 3',
		'Task 4',
		'Task 5',
		'Task 6',
		'Task 7',
		'Task 8',
		'Task 9',
		'Task 12',
	]

	const components = [
		<CentimeterConverter />,
		<Thermometer />,
		<Speedometer />,
		<Sapper cells={cells} />,
		<CompetitionManager listCandidates={listCandidates} />,
		<DancingManager boys={boys} girls={girls} />,
		<DynamicSearch employees={employees} />,
		<SearchCars carsList={cars} />,
		<Translator words={words} />,
		<ChainStores listStores={stores} listProducts={products} />
	]

	const handleTabIndex = index => {
		setTabIndex(index)
	}

	const currentComponent = components.find((_, index) => index === tabIndex)

	return (
		<>
			<div className="tabs">
				<div className="tabs-container">
					<nav className="tabs-nav">
						{buttons.map((button, index) => {
							const activeClass = tabIndex === index ? '-active' : ''
							return (
								<button
									key={index}
									onClick={() => handleTabIndex(index)}
									className={`tabs-title button ${activeClass}`}
								>{button}
								</button>
							)
						})}
					</nav>
				</div>
				{currentComponent && currentComponent}
			</div>
		</>
	)
}

export default App
