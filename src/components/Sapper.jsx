import { useState } from "react"

function Sapper({ cells }) {
	const [gameField, setGameField] = useState(() => cells)
	const [history, setHistory] = useState(() => [copyStateGameField(cells)])
	const [indexHistory, setIndexHistory] = useState(0)

	function copyStateGameField(gameField) {
		return JSON.parse(JSON.stringify(gameField))
	}

	const openCell = idCell => {
		if (isCellOpen(idCell)) return
		const updateGameField = gameField.map(cell => cell.id === idCell ? { ...cell, isOpen: true } : cell)
		setGameField(() => updateGameField)
		setHistory(prevHistory => [...prevHistory, copyStateGameField(updateGameField)])
		setIndexHistory(history.length)
	}

	const isCellOpen = idCell => {
		return gameField.some(cell => cell.id === idCell && cell.isOpen)
	}

	const getClassCell = (isOpen, isMine) => {
		let className = 'sapper-item'
		if (isOpen) className += isMine ? ' -mine' : ' -empty'
		return className
	}

	const setStateHistory = e => {
		const eventType = e.target.getAttribute('data-type')
		const value = eventType === 'prev-state' ? -1 : 1
		const newIndexHistory = indexHistory + value
		const stateGameField = history[newIndexHistory]
		setGameField(stateGameField)
		setIndexHistory(newIndexHistory)
	}

	return (
		<div className="sapper">
			<div className="sapper-container">
				<div className="task">
					<h2 className="task-title">
						Задача 4. Однорядковий сапер. Однорядкова таблиця, до клітинок якої додано інформацію про наявність міни (використати атрибути). Спочатку клітинки сірі. При натисненні на клітинку аналізується чи є там міна і тоді колір стає червоним, якщо немає – зеленим. Додати можливість відкриття усіх сусідніх незамінованих клітинок при відкритті незамінованої клітинки.
					</h2>
				</div>
				<h2 className="sapper-title title">Sapper</h2>
				<div className="sapper-row">
					{gameField.map(({ id, isOpen, isMine }) =>
						<button
							type="button"
							key={id}
							className={getClassCell(isOpen, isMine)}
							onClick={() => openCell(id)}>
						</button>
					)}
				</div>
				<div className="sapper-actions">
					<button
						data-type="prev-state"
						onClick={setStateHistory}
						disabled={!indexHistory}
						className="sapper-button sapper-button-prev button"
					>Prev state
					</button>
					<button
						data-type="next-state"
						onClick={setStateHistory}
						disabled={indexHistory === history.length - 1}
						className="sapper-button sapper-button-next button"
					>Next state
					</button>
				</div>
			</div>
		</div>
	)
}

export default Sapper