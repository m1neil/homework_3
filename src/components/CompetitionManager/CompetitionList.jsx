function CompetitionList({ typeList, list, handleListsChange }) {
	if (!list.length)
		return <div className="competition-info">List is empty...</div>

	const classButton = typeList === 'athletes-competition' ?
		'competition-list-button -reverse' : 'competition-list-button'

	return (
		<ul className="competition-list">
			{list.map(({ id, firstName, lastName }) => (
				<li key={id} className="competition-list-item">
					<button className={classButton} onClick={() => handleListsChange(id, typeList)}>
						<span>{lastName} {firstName}</span>
					</button>
				</li>
			))}
		</ul>
	)
}

export default CompetitionList