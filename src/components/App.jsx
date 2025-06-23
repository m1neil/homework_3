import CentimeterConverter from './CentimeterConverter';
import CompetitionManager from './CompetitionManager/CompetitionManager';
import DancingManager from './DancingManager/DancingManager';
import Sapper from './Sapper';
import Speedometer from './Speedometer';
import Thermometer from './Thermometer';
import { cells, listCandidates, boys, girls } from '../data';

function App() {
	return (
		<>
			<CentimeterConverter />
			<Thermometer />
			<Speedometer />
			<Sapper cells={cells} />
			<CompetitionManager listCandidates={listCandidates} />
			<DancingManager boys={boys} girls={girls} />
		</>
	)
}

export default App
