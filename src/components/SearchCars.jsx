import { useState } from "react"

function SearchCars({ carsList }) {

	const [brand, setBrand] = useState('')
	const [year, setYear] = useState('')

	const createOptionsList = (key, typeSort = 'number') => {
		const funSort = typeSort === 'number' ? sortNumbers : sortStrings
		return carsList.map(car => ({ id: car.id, [key]: car[key] })).sort(funSort)
	}

	const sortNumbers = (a, b) => b.year - a.year
	const sortStrings = (a, b) => {
		return a.brand.toLowerCase() < b.brand.toLowerCase() ? -1 : 1
	}

	const handleBrandChange = e => {
		setBrand(e.target.value)
	}

	const handleYearChange = e => {
		setYear(e.target.value)
	}

	return (
		<div className="search-car">
			<div className="search-car-container">
				<h2 className="search-car-title title">Search Cars</h2>
				<div className="search-car-body body-block">
					<div className="search-car-row">
						<div className="search-car-column">
							<div className="search-car-label">Brand</div>
							<select value={brand} name="mark-car" id="mark-car" className="search-car-select select" onChange={handleBrandChange}>
								<option disabled value="">Chose brand</option>
								{createOptionsList('brand', 'string').map(({ id, brand }) =>
									<option key={id} value={brand}>{brand}</option>)}
							</select>
						</div>
						<div className="search-car-column">
							<div className="search-car-label">Release date</div>
							<select value={year} name="year-car" id="year-car" className="search-car-select select" onChange={handleYearChange}>
								<option disabled value="">Chose year</option>
								{createOptionsList('year', 'number').map(({ id, year }) =>
									<option key={id} value={year}>{year}</option>)}
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchCars