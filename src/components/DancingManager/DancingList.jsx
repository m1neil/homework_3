function DancingList({ gender, list, idSelectedItem, handleChangePair }) {
	if (!list.length)
		return <div className="dancing-info">List is empty...</div>

	return (
		<ul className="dancing-list">
			{list.map(({ id, firstName, lastName }) => {
				const classButton = idSelectedItem === id ?
					"dancing-list-button -selected" : "dancing-list-button"
				return (
					<li key={id} className="dancing-list-item">
						<button
							type="button"
							className={classButton}
							onClick={() => handleChangePair(id, gender)}
						>{lastName} {firstName}
						</button>
					</li>
				)
			})}
		</ul>
	)
}

export default DancingList