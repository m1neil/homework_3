import { useState } from "react"

function SearchCars({ carsList }) {
	const [brand, setBrand] = useState('')
	const [year, setYear] = useState('')

	const handleBrandChange = e => {
		setBrand(e.target.value)
	}

	const handleYearChange = e => {
		setYear(e.target.value)
	}

	const createOptionsList = (key, typeSort = 'number') => {
		const modifyCarsList = carsList.map(car => ({ id: car.id, [key]: car[key] }))
		const funSort = typeSort === 'number' ? sortNumbers : sortStrings
		return getUniqArray(modifyCarsList, key).sort(funSort)
	}

	const getUniqArray = (array, key) => {
		return array.filter((item, index, arr) =>
			index === arr.findIndex(subItem => item[key] === subItem[key]))
	}

	const sortNumbers = (a, b) => b.year - a.year
	const sortStrings = (a, b) => {
		return a.brand.toLowerCase() < b.brand.toLowerCase() ? -1 : 1
	}

	const filterList = car => {
		if (!brand && !year) return true

		let isFindCar
		if (brand && year) {
			isFindCar = car.brand.toLowerCase() === brand.toLowerCase() &&
				car.year === parseInt(year)
		} else if (!brand) {
			isFindCar = car.year === parseInt(year)
		} else isFindCar = car.brand.toLowerCase() === brand.toLowerCase()

		return isFindCar
	}

	const createListCars = () => {
		const items = [...carsList].filter(filterList)
			.sort(sortStrings).map(({ id, brand, year, price }) => (
				<li key={id} className="search-car-list-item">
					{`${brand} - ${year} y. - ${price}$`}
				</li>
			))

		if (!items.length)
			return <div className="info">Nothing was found!</div>

		return <ul className="search-car-list">{items}</ul>
	}

	return (
		<div className="search-car">
			<div className="search-car-container">
				<h2 className="search-car-title title">Search Cars</h2>
				<div className="search-car-body body-block">
					<div className="search-car-row">
						<div className="search-car-column">
							<div className="search-car-label label">Brand</div>
							<select
								value={brand}
								name="mark-car"
								id="mark-car"
								className="search-car-select select"
								onChange={handleBrandChange}>
								<option value="">Chose brand</option>
								{createOptionsList('brand', 'string').map(({ id, brand }) => (
									<option key={id} value={brand}>{brand}</option>
								))}
							</select>
						</div>
						<div className="search-car-column">
							<div className="search-car-label label">Release date</div>
							<select
								value={year}
								name="year-car"
								id="year-car"
								className="search-car-select select"
								onChange={handleYearChange}>
								<option value="">Chose year</option>
								{createOptionsList('year', 'number').map(({ id, year }) => (
									<option key={id} value={year}>{year}</option>
								))}
							</select>
						</div>
					</div>
					<h3 className="search-car-label label">Cars</h3>
					{createListCars()}
				</div>
			</div>
		</div>
	)
}

export default SearchCars