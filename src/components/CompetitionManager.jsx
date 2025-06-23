import { useState } from "react"

function CompetitionManager({ listCandidates = [] }) {
	const [candidates, setCandidates] = useState(() => listCandidates.sort(sortList))
	const [athletesCompetition, setAthletesCompetition] = useState([])

	const TYPE_CANDIDATES_LIST = 'candidates-list'
	const TYPE_ATHLETES_COMPETITION_LIST = 'athletes-competition'

	// methods ========================================================

	const handleListsChange = (target, idCandidate) => {
		const typeList = target.closest('.competition-list').getAttribute('data-type')
		try {
			typeList === TYPE_CANDIDATES_LIST ? chooseCandidate(idCandidate) : cancelCandidacy(idCandidate)
		} catch (error) {
			console.error(error.message)
		}
	}

	const chooseCandidate = idCandidate => {
		const findCandidate = findElement(candidates, idCandidate)
		moveToSelected(findCandidate, setAthletesCompetition, setCandidates)
	}

	const cancelCandidacy = idCandidate => {
		const findCandidate = findElement(athletesCompetition, idCandidate)
		moveToSelected(findCandidate, setCandidates, setAthletesCompetition)
	}

	const findElement = (list, idFindElement) => {
		const element = list.find(item => item.id === idFindElement)
		if (!element)
			throw new RangeError(`Not found element by id - ${idFindElement}!`)
		return element
	}

	const moveToSelected = (element, setCandidateInList, removeCandidateFromList) => {
		setCandidateInList(prevCandidateList => [...prevCandidateList, { ...element }].sort(sortList))
		removeCandidateFromList(prevCandidateList => prevCandidateList.filter(candidate => candidate.id !== element.id))
	}

	function sortList(a, b) {
		return a.lastName.localeCompare(b.lastName, 'uk')
	}

	const createList = (list, typeList) => {
		if (!list.length)
			return <div className="competition-info">List is empty...</div>

		const classButton = typeList === 'athletes-competition' ? 'competition-list-button -reverse' : 'competition-list-button'
		const itemsList = list.map(({ id, firstName, lastName }) => (
			<li key={id} className="competition-list-item">
				<button onClick={e => handleListsChange(e.target, id)} className={classButton}>
					<span>{lastName} {firstName}</span>
				</button>
			</li>
		))

		return <ul data-type={typeList} className="competition-list">{itemsList}</ul>
	}

	return (
		<div className="competition">
			<div className="competition-container">
				<h2 className="competition-title title">Competition manager</h2>
				<div className="competition-body body-block">
					<div className="competition-column">
						<h3 className="competition-label">General list</h3>
						{createList(candidates, TYPE_CANDIDATES_LIST)}
					</div>
					<div className="competition-column">
						<h3 className="competition-label">Selected for competition</h3>
						{createList(athletesCompetition, TYPE_ATHLETES_COMPETITION_LIST)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompetitionManager