function ProductsList({ list, selectedProducts, handleSelectedProducts, isBlocked }) {
	if (!list.length)
		return <div className="info">Products list is empty</div>


	const styleBlocked = isBlocked ? '-blocked' : ''

	return (
		<ul className={`stores-list ${styleBlocked}`}>
			{list.map(({ id, name }) => {
				const classSelected = selectedProducts.includes(id) ? '-selected' : ''
				return (
					<li key={id} className="stores-list-item">
						<button
							type="button"
							onClick={() => handleSelectedProducts(id)}
							className={`stores-list-button ${classSelected}`}
						>{name}
						</button>
					</li>
				)
			})}
		</ul>
	)
}

export default ProductsList