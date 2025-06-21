import CentimeterConverter from './CentimeterConverter';
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
	];

	return (
		<>
			<CentimeterConverter />
			<Thermometer />
			<Speedometer />
			<Sapper cells={cells} />
		</>
	)
}

export default App
