import { useState } from "react"

function Speedometer() {
	const [allowedSpeed, setAllowedSpeed] = useState('')
	const [currentSpeed, setCurrentSpeed] = useState('')

	const handleSpeedChange = e => {
		const { value, name } = e.target
		const regExp = /\D/
		if (regExp.test(value)) return
		name === 'allowed-speed' ? setAllowedSpeed(value) : setCurrentSpeed(value)
	}

	const getCurSpeedFromAllowed = (curSpeed, maxSpeed) => {
		return isNaN(curSpeed) || isNaN(maxSpeed) ? null : curSpeed / maxSpeed * 100
	}

	const getClassStylesInput = speedPercent => {
		if (speedPercent === null) return ''

		let className
		if (speedPercent >= 100) className = '-red'
		else if (speedPercent >= 50) className = '-green'
		else className = '-orange'

		return className
	}

	const speedPercent = getCurSpeedFromAllowed(
		parseInt(currentSpeed),
		parseInt(allowedSpeed)
	)
	const classStyleInput = getClassStylesInput(speedPercent)

	let contentWarning
	if (speedPercent && speedPercent > 90)
		contentWarning = <div className="warning warning-blink">Attention!!!</div>
	else contentWarning = null


	return (
		<section className="speedometer">
			<div className="speedometer-container">
				<div className="task">
					<h2 className="task-title">
						Задача 3. Вводиться дозволена швидкість і поточна швидкість авто. Якщо не введено дозволену швидкість, то елемент введення поточної швидкості заблокований. Якщо швидкість менше 50% дозволеної, то колір input – оранжевий, якщо від 50% до 100% - зелений, вище 100% - червоний. Якщо значення вище 90% починає блимати повідомлення «Увага!»
					</h2>
				</div>
				<h2 className="speedometer-title title">Speedometer</h2>
				<div className="speedometer-body body-block">
					<div className="speedometer-row">
						<input
							type="text"
							name="allowed-speed"
							value={allowedSpeed}
							onChange={handleSpeedChange}
							className="speedometer-input input"
							placeholder="Allowed speed"
						/>
						<input
							type="text"
							name="current-speed"
							value={currentSpeed}
							onChange={handleSpeedChange}
							disabled={!allowedSpeed}
							className={`speedometer-input input ${classStyleInput}`}
							placeholder="Current speed"
						/>
					</div>
					{contentWarning}
				</div>
			</div>
		</section>
	)
}

export default Speedometer