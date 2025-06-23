import { useState } from "react"
import DancingList from "./DancingList"

function DancingManager({ boys, girls }) {
	const [listBoys, setListBoys] = useState(() => boys.sort(sortList))
	const [listGirls, setListGirls] = useState(() => girls.sort(sortList))
	const [listPairs, setListPairs] = useState([])
	const [pair, setPair] = useState(() => ({
		idBoy: null,
		idGirl: null
	}))

	function sortList(a, b) {
		return a.lastName.localeCompare(b.lastName, 'uk')
	}

	const handleChangePair = (idHuman, gender) => {
		const nameField = gender === 'male' ? 'idBoy' : 'idGirl'
		setPair(prevPair => ({ ...prevPair, [nameField]: idHuman }))
	}

	const addPair = () => {
		const { idBoy, idGirl } = pair
		try {
			const newPair = {
				id: Date.now(),
				boy: { ...findElement(idBoy, listBoys) },
				girl: { ...findElement(idGirl, listGirls) }
			}
			setListPairs(prevListPairs => [...prevListPairs, newPair])
			removeElement(idBoy, setListBoys)
			removeElement(idGirl, setListGirls)
			setPair({ idBoy: null, idGirl: null })
		} catch (error) {
			console.error(error.message)
		}
	}

	const findElement = (idElement, list) => {
		const element = list.find(item => item.id === idElement)
		if (!element) throw new Error(`Not found element by id: ${idElement}`)
		return element
	}

	const removeElement = (idElement, setList) => {
		setList(prevList => prevList.filter(item => item.id !== idElement))
	}

	const createListPairs = () => {
		if (!listPairs.length)
			return <div className="dancing-info">List is empty...</div>

		const items = listPairs.map(({ id, boy, girl }) => (
			<li key={id} className="dancing-list-item">
				<div className="dancing-list-button">
					{`${boy.lastName} ${boy.firstName} - ${girl.lastName} ${girl.firstName}`}
				</div>
			</li>
		))

		return <ul className="dancing-list">{items}</ul>
	}

	const { idBoy, idGirl } = pair
	const isDisabledButton = idBoy === null || idGirl === null

	return (
		<div className="dancing">
			<div className="dancing-container">
				<h2 className="dancing-title title">Dancing manager</h2>
				<div className="dancing-body body-block">
					<div className="dancing-row">
						<div className="dancing-column">
							<h3 className="dancing-label">Boys</h3>
							<DancingList
								gender="male"
								list={listBoys}
								idSelectedItem={idBoy}
								handleChangePair={handleChangePair}
							/>
						</div>
						<div className="dancing-column">
							<h3 className="dancing-label">Girls</h3>
							<DancingList
								gender="female"
								list={listGirls}
								idSelectedItem={idGirl}
								handleChangePair={handleChangePair}
							/>
						</div>
					</div>
					<button
						type="button"
						className="button"
						onClick={addPair}
						disabled={isDisabledButton}
					>Add a pair
					</button>
					<div className="dancing-column">
						<h3 className="dancing-label">Selected pairs</h3>
						{createListPairs()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default DancingManager