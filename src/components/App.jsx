import CentimeterConverter from './CentimeterConverter';
import CompetitionManager from './CompetitionManager/CompetitionManager';
import DancingManager from './DancingManager/DancingManager';
import Sapper from './Sapper';
import Speedometer from './Speedometer';
import Thermometer from './Thermometer';
import DynamicSearch from './DynamicSearch';
import {
	cells,
	listCandidates,
	boys,
	girls,
	employees,
	cars
} from '../data';
import SearchCars from './SearchCars';

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
		</>
	)
}

export default App
