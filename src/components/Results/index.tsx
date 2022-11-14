import React, { useContext } from 'react'
import { GameContext } from '../../context/gameContext'
import styles from '../../styles/Results/styles.module.scss'
import timer from '../../assets/timer.svg'
import contrastChecker from '../../util/contrastChecker'

const Results = () => {
	const { timeLine } = useContext(GameContext)

	return (
		<div className={styles.results}>
			<h2>Current/Latest Game</h2>
			<div className={styles.resultsgridcontent}>
				<p>Guessed color</p>
				<p>Correct color</p>
				<p>Score</p>
				{timeLine.length > 0 &&
					timeLine.map(({ correctColor, guessedColor, timeSpent }, i) => {
						return correctColor === guessedColor ? (
							<React.Fragment key={i}>
								<span
									className={styles.correct}
									style={{
										backgroundColor: correctColor,
										color: contrastChecker(correctColor),
									}}
								>
									{correctColor}
								</span>
								<span className={styles.checked}>{timeSpent}s</span>
							</React.Fragment>
						) : (
							<React.Fragment key={i}>
								<span
									className={styles.incorrect}
									style={{
										backgroundColor: guessedColor === 'X' ? '' : guessedColor,
										color: contrastChecker(correctColor),
									}}
								>
									{guessedColor === 'X' ? (
										<img src={timer} style={{ width: '1.5rem' }} />
									) : (
										guessedColor
									)}
								</span>
								<span
									className={styles.incorrect}
									style={{
										backgroundColor: correctColor,
										color: contrastChecker(correctColor),
									}}
								>
									{correctColor}
								</span>
								<span className={styles.unchecked}>{timeSpent}s</span>
							</React.Fragment>
						)
					})}
			</div>
		</div>
	)
}

export default React.memo(Results)
