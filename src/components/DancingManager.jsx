import { useState } from "react"

function DancingManager({ boys, girls }) {
	const [boysList, setBoys] = useState(boys)
	const [girlsList, setGirls] = useState(girls)

	return (
		<div className="dancing">
			<div className="dancing-container">
				<h2 className="dancing-title title">Dancing manager</h2>
				<div className="dancing-body body-block"></div>
			</div>
		</div>
	)
}

export default DancingManager