import { useEffect, useRef, useState } from "react"

function Translator({ words }) {
	const KEY_EN = 'en'
	const KEY_UA = 'ua'
	const [enWords, setEnWords] = useState(() => mixWords(transformWords(KEY_EN, words)))
	const [uaWords, setUaWords] = useState(() => mixWords(transformWords(KEY_UA, words)))
	const [selectedWords, setSelectedWords] = useState(() => ({}))
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
	const refInterval = useRef(null)

	useEffect(() => {
		const idUaWord = selectedWords[KEY_UA]
		const idEnWord = selectedWords[KEY_EN]
		if (idUaWord === undefined || idEnWord === undefined) return

		const isCorrect = idUaWord === idEnWord
		setIsCorrectAnswer(isCorrect)

		refInterval.current = setTimeout(() => {
			refInterval.current = null
			setIsCorrectAnswer(false)
			setSelectedWords({})
			if (isCorrect) {
				removeWord(setEnWords, idEnWord)
				removeWord(setUaWords, idUaWord)
			}
		}, 1000)

		return () => clearInterval(refInterval.current)
	}, [selectedWords])

	const removeWord = (setWords, idRemoveWord) => {
		setWords(prevWords => prevWords.filter(word => word.id !== idRemoveWord))
	}

	const handleIdSelectedWords = (key, idWord) => {
		if (refInterval.current) return
		setSelectedWords(prevSelectedWords => ({ ...prevSelectedWords, [key]: idWord }))
	}

	const createList = (key, listWords) => {
		if (!listWords.length) return null

		const items = listWords.map(word => {
			const classButton = getClassButton(key, word.id)
			return <li key={word.id} className="translator-list-item">
				<button
					type="button"
					className={`translator-list-button button ${classButton}`}
					onClick={() => handleIdSelectedWords(key, word.id)}
				>{word[key]}
				</button>
			</li>
		})

		return <ul className="translator-list">{items}</ul>
	}

	const getClassButton = (key, idWord) => {
		const idSelectedWord = selectedWords[key]
		if (idSelectedWord === undefined) return ''
		const idIsEqual = idSelectedWord === idWord

		let classButton
		if (isCorrectAnswer && idIsEqual)
			classButton = '-correct'
		else if (getIsMistake(idIsEqual))
			classButton = '-mistake'
		else if (idIsEqual)
			classButton = '-selected'
		else classButton = ''

		return classButton
	}

	const getIsMistake = idIsEqual => {
		if (
			selectedWords[KEY_EN] === undefined ||
			selectedWords[KEY_UA] === undefined ||
			isCorrectAnswer || !idIsEqual
		) return false

		return true
	}

	function mixWords(words) {
		const newWords = []
		const length = words.length
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * words.length)
			newWords.push(words[randomIndex])
			words.splice(randomIndex, 1)
		}
		return newWords
	}

	function transformWords(key, words) {
		return words.map(word => (
			{ id: word.id, [key]: word[key] }
		))
	}

	return (
		<div className="translator">
			<div className="translator-container">
				<div className="task">
					<h2 className="task-title">
						Задача 9. Перекладач. Користувачу виводять змішані картки з словами на англійській і українській мові. Користувач поступово клікає на картки (виділяємо синьою рамкою). Якщо знайдено правильні пари карток, що відповідають одному слову, то видаляємо ці картки. Інакше - виділяємо червоною рамкою і через секунду забираємо рамку.
					</h2>
				</div>
				<h2 className="translator-title title">Translator</h2>
				<div className="translator-body body-block">
					<div className="translator-label label">Find a pair of words</div>
					<div className="translator-row">
						{createList(KEY_EN, enWords)}
						{createList(KEY_UA, uaWords)}
						{!enWords.length && <div className="info info-green">The exercise is completed!</div>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Translator