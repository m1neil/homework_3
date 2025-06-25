import CentimeterConverter from './CentimeterConverter'
import CompetitionManager from './CompetitionManager/CompetitionManager'
import DancingManager from './DancingManager/DancingManager'
import Sapper from './Sapper'
import Speedometer from './Speedometer'
import Thermometer from './Thermometer'
import DynamicSearch from './DynamicSearch'
import SearchCars from './SearchCars'
import {
	cells,
	listCandidates,
	boys,
	girls,
	employees,
	cars,
	words
} from '../data';
import Translator from './Translator/Translator'

function App() {
	return (
		<>
			<CentimeterConverter />
			<Thermometer />
			<Speedometer />
			<Sapper cells={cells} />
			<CompetitionManager listCandidates={listCandidates} />
			<DancingManager boys={boys} girls={girls} />
			<DynamicSearch employees={employees} />
			<SearchCars carsList={cars} />
			<Translator words={words} />
		</>
	)
}

export default App
