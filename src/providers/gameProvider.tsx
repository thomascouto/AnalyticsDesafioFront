import React, { useCallback, useEffect } from 'react'
import { GameContext } from '../context/gameContext'
import {
	STORAGE_HIGH_SCORE,
	TIME_LIMIT,
	STORAGE_LATEST_GAME,
} from '../util/constants'

export const GameProvider = ({ children }: any) => {
	const [isStarted, setIsStarted] = React.useState(false)
	const [score, setScore] = React.useState(0)
	const [highScore, setHighScore] = React.useState(0)
	const [totalTimeRemaining, setTotalTimeRemaining] = React.useState(0)
	const [timeLine, setTimeLine] = React.useState<TimeLine[]>([])

	useEffect(() => {
		const storageValue = localStorage.getItem(STORAGE_HIGH_SCORE) ?? '0'
		const latestGameFromStorage = localStorage.getItem(STORAGE_LATEST_GAME)

		if (storageValue === '0')
			localStorage.setItem(STORAGE_HIGH_SCORE, storageValue)

		if (latestGameFromStorage) {
			const json: TimeLine[] = Array.from(JSON.parse(latestGameFromStorage))
			setTimeLine(json)
		}
		setHighScore(parseInt(storageValue))
	}, [])

	useEffect(() => {
		if (isStarted) {
			setTotalTimeRemaining(TIME_LIMIT)
			setScore(0)
			setTimeLine([])
		} else {
			setTotalTimeRemaining(0)

			if (timeLine.length > 0)
				localStorage.setItem(STORAGE_LATEST_GAME, JSON.stringify(timeLine))
		}
	}, [isStarted])

	useEffect(() => {
		let timer: NodeJS.Timer

		if (isStarted) {
			timer = setInterval(() => {
				setTotalTimeRemaining((prev) => (prev - 1 < 0 ? 0 : prev - 1))
			}, 1000)
			if (totalTimeRemaining === 0) setIsStarted(false)
		}

		return () => clearInterval(timer)
	}, [totalTimeRemaining])

	useEffect(() => {
		if (score > highScore) {
			setHighScore(score)
			localStorage.setItem(STORAGE_HIGH_SCORE, score.toString())
		}
	}, [score])

	const handleScore = (score: number) => {
		setScore((s) => s + score)
	}

	const handleStart = (isStarted: boolean) => {
		setIsStarted(isStarted)
	}

	const handleReset = () => {
		setIsStarted(false)
		setTimeLine([])
		setScore(0)
	}

	const handleResetAllData = () => {
		handleReset()
		localStorage.clear()
		setHighScore(0)
	}

	const handleCalculateScore = useCallback(
		(
			{ correctColor, guessedColor, timeSpent }: GameStatusScore,
			isTimeOut?: boolean
		) => {
			const score = isTimeOut ? -2 : guessedColor === correctColor ? 5 : -1
			handleScore(score)
			setTimeLine((tl) => [{ guessedColor, correctColor, timeSpent }, ...tl])
		},
		[timeLine]
	)

	return (
		<GameContext.Provider
			value={{
				score,
				highScore,
				handleStart,
				handleReset,
				handleResetAllData,
				handleCalculateScore,
				isStarted,
				timeLimit: TIME_LIMIT,
				totalTimeRemaining,
				timeLine,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}
