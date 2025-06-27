function StoresList({ list, selectedStoreId, handleSelectedStore }) {
	if (!list.length)
		return <div className="info">Stores list is empty</div>

	return (
		<ul className="stores-list">
			{list.map(({ id, name }) => {
				const classButton = selectedStoreId === id ? '-selected' : ''
				return (
					<li key={id} className="stores-list-item">
						<button
							type="button"
							onClick={() => handleSelectedStore(id)}
							className={`stores-list-button ${classButton}`}
						>{name}
						</button>
					</li>
				)
			})}
		</ul>
	)
}

export default StoresList