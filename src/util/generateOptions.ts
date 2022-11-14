const correctOption = (gameLevel: GameLevel) =>
	Math.floor(Math.random() * (gameLevel - 1)) + 1

const colorGenerator = () =>
	'#' +
	((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0').toUpperCase()

const generateOptions = (gameLevel: GameLevel = 4) => {
	const correct = correctOption(gameLevel)
	const optionsArray: GameOptions[] = []

	for (let i = 1; i < gameLevel; i++) {
		const color = colorGenerator()
		optionsArray.push({
			color,
			isCorrect: i === correct ? true : false,
		})
	}

	return optionsArray
}

export default generateOptions
