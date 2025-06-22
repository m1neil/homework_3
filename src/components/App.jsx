import CentimeterConverter from './CentimeterConverter';
import CompetitionManager from './CompetitionManager';
import Sapper from './Sapper';
import Speedometer from './Speedometer';
import Thermometer from './Thermometer';

function App() {
	const cells = [
		{ id: 0, isMine: false, isOpen: false },
		{ id: 1, isMine: true, isOpen: false },
		{ id: 2, isMine: false, isOpen: false },
		{ id: 3, isMine: false, isOpen: false },
		{ id: 4, isMine: true, isOpen: false },
		{ id: 5, isMine: false, isOpen: false },
		{ id: 6, isMine: false, isOpen: false },
		{ id: 7, isMine: false, isOpen: false },
		{ id: 8, isMine: true, isOpen: false },
		{ id: 9, isMine: false, isOpen: false }
	]

	const listCandidates = [
		{ id: 1, firstName: "Олександр", lastName: "Іванов" },
		{ id: 2, firstName: "Марія", lastName: "Петрова" },
		{ id: 3, firstName: "Іван", lastName: "Коваль" },
		{ id: 4, firstName: "Світлана", lastName: "Гончар" },
		{ id: 5, firstName: "Дмитро", lastName: "Сидоренко" },
		{ id: 6, firstName: "Олена", lastName: "Бондаренко" },
		{ id: 7, firstName: "Володимир", lastName: "Козак" },
		{ id: 8, firstName: "Ірина", lastName: "Литвин" },
	]


	return (
		<>
			<CentimeterConverter />
			<Thermometer />
			<Speedometer />
			<Sapper cells={cells} />
			<CompetitionManager listCandidates={listCandidates} />
		</>
	)
}

export default App
