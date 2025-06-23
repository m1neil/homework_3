import { useState } from "react"

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

	const handleChangePair = (target, idHuman) => {
		const gender = target.closest('.dancing-list').getAttribute('data-type')
		const nameField = gender === 'boys' ? 'idBoy' : 'idGirl'
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

	const createList = (typeList, list) => {
		if (!list.length)
			return <div className="dancing-info">List is empty...</div>

		const { idBoy, idGirl } = pair
		const items = list.map(({ id, firstName, lastName }) => {
			let classButton
			if (
				typeList === 'boys' && idBoy === id ||
				typeList === 'girls' && idGirl === id
			) classButton = "dancing-list-button -selected"
			else classButton = "dancing-list-button"

			return (
				<li key={id} className="dancing-list-item">
					<button
						type="button"
						className={classButton}
						onClick={e => handleChangePair(e.target, id)}
					>{lastName} {firstName}
					</button>
				</li>
			)
		})

		return <ul data-type={typeList} className="dancing-list">{items}</ul>
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
							{/* <ul data-type="boys" className="dancing-list">
								{listBoys.map(({ id, firstName, lastName }) => (
									<li key={id} className="dancing-list-item">
										<button
											type="button"
											className={`dancing-list-button ${id === idBoy ? '-selected' : ''}`}
											onClick={e => handleChangePair(e.target, id)}
										>{lastName} {firstName}
										</button>
									</li>
								))}
							</ul> */}
							{createList('boys', listBoys)}
						</div>
						<div className="dancing-column">
							<h3 className="dancing-label">Girls</h3>
							{/* <ul data-type="girls" className="dancing-list">
								{listGirls.map(({ id, firstName, lastName }) => (
									<li key={id} className="dancing-list-item">
										<button
											type="button"
											className={`dancing-list-button ${id === idGirl ? '-selected' : ''}`}
											onClick={e => handleChangePair(e.target, id)}
										>{lastName} {firstName}
										</button>
									</li>
								))}
							</ul> */}
							{createList('girls', listGirls)}
						</div>
					</div>
					<button onClick={addPair} disabled={isDisabledButton} type="button" className="button">Add a pair</button>
					<div className="dancing-column">
						<h3 className="dancing-label">Selected pairs</h3>
						<ul className="dancing-list">
							{listPairs.map(({ id, boy, girl }) => (
								<li key={id} className="dancing-list-item">
									<div className="dancing-list-button">
										{`${boy.lastName} ${boy.firstName} - ${girl.lastName} ${girl.firstName}`}
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DancingManager