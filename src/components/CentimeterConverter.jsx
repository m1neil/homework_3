import { useState } from "react"

function CentimeterConverter() {
	const [centimeters, setCentimeters] = useState('')
	const centimetersNumber = parseInt(centimeters)
	const meters = isNaN(centimetersNumber) ? 0 : centimeters / 100
	const kilometers = isNaN(centimetersNumber) ? 0 : meters / 1000

	const handleCentimetersChange = e => {
		const value = e.target.value
		const regExp = /\D/
		if (regExp.test(value)) return
		setCentimeters(value)
	}

	return (
		<section className="converter">
			<div className="converter-container">
				<div className="task">
					<h2 className="task-title">
						Задача 1. З клавіатури вводиться довжина у сантиметрах. Виводити скільки це метрів, кілометрів.
					</h2>
				</div>
				<h2 className="converter-title title">Converter centimeters</h2>
				<div className="converter-body body-block">
					<input
						type="text"
						name="centimeters"
						value={centimeters}
						onChange={handleCentimetersChange}
						placeholder="Centimeters"
						className="centimeters-input input"
					/>
					<div className="converter-unit">Meters <span>{meters.toFixed(2)}</span></div>
					<div className="converter-unit">Kilometers <span>{kilometers.toFixed(2)}</span></div>
				</div>
			</div>
		</section>
	)
}

export default CentimeterConverter