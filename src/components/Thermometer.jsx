import { useState } from "react"

function Thermometer() {
	const [temperature, setTemperature] = useState('')

	const handleTemperatureChange = e => {
		const value = e.target.value
		const regExp = /[^0-9-]/
		if (regExp.test(value)) return
		setTemperature(value)
	}

	const getClassStyle = () => {
		const temperatureNumber = parseInt(temperature)
		if (isNaN(temperatureNumber)) return

		let className
		if (temperatureNumber > 22) className = '-red'
		else if (temperatureNumber > 10) className = '-green'
		else if (temperatureNumber >= 0) className = '-blue'
		else className = '-white'

		return className

	}

	return (
		<section className="thermometer">
			<div className="thermometer-container">
				<div className="task">
					<h2 className="task-title">
						Задача 2. З клавіатури вводиться температура. Змінювати колір фону у залежності від значення:
					</h2>
					<ul className="task-list">
						<li className="task-list-item">менше нуля – білий</li>
						<li className="task-list-item">від 0 до 10 – синій</li>
						<li className="task-list-item">від 11 до 22 – зелений</li>
						<li className="task-list-item">вище 22 – червоний</li>
					</ul>
				</div>
				<h2 className="thermometer-title title">Thermometer</h2>
				<div className={`thermometer-body body-block ${getClassStyle()}`}>
					<input
						type="text"
						name="thermometer"
						value={temperature}
						onChange={handleTemperatureChange}
						className="thermometer-input input"
						placeholder="temperature"
					/>
				</div>
			</div>
		</section>
	)
}

export default Thermometer