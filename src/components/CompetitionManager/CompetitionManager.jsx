import { useState } from "react"
import CompetitionList from "./CompetitionList"

function CompetitionManager({ listCandidates = [] }) {
	const [candidates, setCandidates] = useState(() => listCandidates.sort(sortList))
	const [athletesCompetition, setAthletesCompetition] = useState([])

	const TYPE_CANDIDATES_LIST = 'candidates-list'
	const TYPE_ATHLETES_COMPETITION_LIST = 'athletes-competition'

	// methods ========================================================

	const handleListsChange = (idCandidate, typeList) => {
		try {
			typeList === TYPE_CANDIDATES_LIST ?
				chooseCandidate(idCandidate) : cancelCandidacy(idCandidate)
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

	return (
		<div className="competition">
			<div className="competition-container">
				<h2 className="competition-title title">Competition manager</h2>
				<div className="competition-body body-block">
					<div className="competition-column">
						<h3 className="competition-label">General list</h3>
						<CompetitionList
							list={candidates}
							typeList={TYPE_CANDIDATES_LIST}
							handleListsChange={handleListsChange}
						/>
					</div>
					<div className="competition-column">
						<h3 className="competition-label">Selected for competition</h3>
						<CompetitionList
							list={athletesCompetition}
							typeList={TYPE_ATHLETES_COMPETITION_LIST}
							handleListsChange={handleListsChange}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompetitionManager