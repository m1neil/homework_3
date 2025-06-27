import { useState } from "react"

function DynamicSearch({ employees }) {
	const [searchText, setSearchText] = useState('')

	const handleSearchTextChange = e => {
		setSearchText(e.target.value)
	}

	const getFullName = ({ firstName, lastName, patronymic }) => {
		return `${lastName} ${firstName[0]}.${patronymic[0]}.`
	}

	const searchEmployees = () => {
		let content
		if (!searchText.trim())
			content = employees
		else {
			content = employees.filter(employee => (
				getFullName(employee)
					.toLowerCase().includes(searchText.toLowerCase()))
			)
		}
		return content
	}

	const createList = list => {
		if (!list.length)
			return <div className="info">Not found employee</div>

		const items = list.map(employee => (
			<li key={employee.id} className="dynamic-search-list-item">
				{getFullName(employee)}
			</li>
		))

		return <ul className="dynamic-search-list">{items}</ul>
	}

	return (
		<div className="dynamic-search">
			<div className="dynamic-search-container">
				<div className="task">
					<h2 className="task-title">
						Задача 7. Динамічний пошук. Є список працівників і поле пошуку. При введенні відображаються усі, які містять вказаний фрагмент
					</h2>
				</div>
				<h2 className="dynamic-search-title title">Dynamic search</h2>
				<div className="dynamic-search-body body-block">
					<div className="dynamic-search-form form">
						<input
							type="text"
							name="search"
							value={searchText}
							placeholder="Search"
							className="form-input input"
							onChange={handleSearchTextChange}
						/>
					</div>
					<div className="dynamic-search-label label">Employees</div>
					<ul className="dynamic-search-list">
						{createList(searchEmployees())}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default DynamicSearch