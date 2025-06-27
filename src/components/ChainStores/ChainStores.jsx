import { useState } from "react";
import StoresList from "./StoresList";
import ProductsList from "./ProductsList";
import DistributedGoods from "./DistributedGoods";

function ChainStores({ listStores, listProducts }) {
	const [stores, setStores] = useState(() => [...listStores])
	const [selectedProducts, setSelectedProducts] = useState([])
	const [selectedStoreId, setSelectedStoreId] = useState(null)

	const handleSelectedStore = storeId => {
		const findStore = stores.find(store => store.id === storeId)
		setSelectedStoreId(storeId)
		setSelectedProducts([...findStore.selectedProductIds])
	}

	const handleSelectedProducts = idProduct => {
		const isIncludeProductId = selectedProducts.includes(idProduct)
		if (isIncludeProductId) {
			setSelectedProducts(prevSelectedProducts =>
				prevSelectedProducts.filter(id => id !== idProduct)
			)
		} else {
			setSelectedProducts(prevSelectedProducts =>
				[...prevSelectedProducts, idProduct]
			)
		}
	}

	const addProduct = () => {
		setStores(prevStores => (
			prevStores.map(store => (
				store.id === selectedStoreId ?
					{ ...store, selectedProductIds: [...selectedProducts] } : store
			))
		))
	}

	const isDisabledButton = !selectedProducts.length || !selectedStoreId

	return (
		<div className="stores">
			<div className="stores-container">
				<div className="task">
					<h2 className="task-title">
						Здача 12. Мережа магазинів. Дано список відділень та список товарів. Для кожного відділення можна вибирати декілька товарів. Вибирати та відображати перелік вибраних товарів для кожного відділення.
					</h2>
				</div>
				<h2 className="stores-title title">Chain Stores</h2>
				<div className="stores-body body-block">
					<div className="stores-row">
						<div className="stores-column">
							<div className="stores-label label">Departments</div>
							<StoresList
								list={stores}
								selectedStoreId={selectedStoreId}
								handleSelectedStore={handleSelectedStore}
							/>
						</div>
						<div className="stores-column">
							<div className="stores-label label">Products</div>
							<ProductsList
								isBlocked={selectedStoreId === null}
								list={listProducts}
								selectedProducts={selectedProducts}
								handleSelectedProducts={handleSelectedProducts}
							/>
						</div>
					</div>
					<button
						type="button"
						onClick={addProduct}
						disabled={isDisabledButton}
						className="stores-button button"
					>Add
					</button>
					<div className="stores-label label">Distribution of goods</div>
					<DistributedGoods
						stores={stores}
						listProducts={listProducts}
					/>
				</div>
			</div>
		</div>
	)
}

export default ChainStores