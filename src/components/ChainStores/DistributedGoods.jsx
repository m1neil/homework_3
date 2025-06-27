function DistributedGoods({ stores, listProducts }) {

	const getSubList = list => {
		return list.map(idProduct => {
			const { id, name } = findProduct(idProduct)
			return <li key={id} className="sub-list-item">{name}</li>
		})
	}

	const findProduct = (idProduct) => {
		return listProducts.find(product => product.id === idProduct)
	}

	const filteredStore = stores.filter(store => store.selectedProductIds.length > 0)
	if (!filteredStore.length)
		return <div>List goods is empty!</div>

	return (
		<ul className="stores-list">
			{filteredStore.map(({ id, name, selectedProductIds }) => (
				<li key={id} className="stores-list-item mb-20">
					<div className="stores-list-label">{name}</div>
					<ul className="stores-sub-list sub-list">{getSubList(selectedProductIds)}</ul>
				</li>
			))}
		</ul>
	)
}

export default DistributedGoods