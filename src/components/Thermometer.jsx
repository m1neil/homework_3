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
				<h2 className="thermometer-title title">Thermometer</h2>
				<div className={`thermometer-body ${getClassStyle()}`}>
					<input placeholder="temperature" value={temperature} onChange={handleTemperatureChange} type="text" className="thermometer-input input" />
				</div>
			</div>
		</section>
	)
}

export default Thermometer