import styles from "./HomePage.module.scss";
import { generateRandomNumber, numbersInFrench } from "./homeUtils";
import { useState, useEffect } from "react";

const HomePage = () => {
  const highScoreKey = "frenchGameHighScore";
  const minNumberToLearn = 0;
  const maxNumberToLearn = 100;
  const [userChoice, setUserChoice] = useState<number | string>("--");
  const [currentQuestionNumberValue, setCurrentQuestionNumberValue] = useState(
    generateRandomNumber(minNumberToLearn, maxNumberToLearn)
  );
  const [currentQuestionStringValue, setCurrentQuestionStringValue] = useState(
    numbersInFrench[currentQuestionNumberValue]
  );
  //true = correct answer
  //false = wrong answer
  const [outcomeIndicator, setOutcomeIndicator] = useState<boolean | null>(
    null
  );
  const [streakCount, setStreakCount] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem(highScoreKey) || 0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserChoice(+parseFloat(e.target.value));
    console.log(+parseFloat(e.target.value));
  };

  const handleSubmit = () => {
    const newQuestion = generateRandomNumber(
      minNumberToLearn,
      maxNumberToLearn
    );
    setCurrentQuestionNumberValue(newQuestion);
    setCurrentQuestionStringValue(numbersInFrench[newQuestion]);
    setUserChoice("--");

    //do the check
    if (userChoice === currentQuestionNumberValue) {
      setOutcomeIndicator(true);
      setStreakCount(streakCount + 1);
    } else {
      setOutcomeIndicator(false);
      setStreakCount(0);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem(highScoreKey)) {
      localStorage.setItem(highScoreKey, JSON.stringify(streakCount));
    }

    if (localStorage.getItem(highScoreKey)) {
      if (+highScore < streakCount) {
        setHighScore(streakCount);
        localStorage.setItem(highScoreKey, JSON.stringify(streakCount));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streakCount]);

  return (
    <main className={styles.HomePage}>
      <h1>
        Pratique {minNumberToLearn}-{maxNumberToLearn} en Français
      </h1>

      <section className={styles.form_container}>
        <h2>{currentQuestionStringValue}</h2>
        <input
          type="number"
          className={styles.input_box}
          placeholder="Nombre?"
          max={100}
          min={0}
          value={userChoice === null ? 0 : userChoice}
          onChange={handleInputChange}
        />
        <button
          className={styles.create_button}
          onClick={handleSubmit}
          disabled={userChoice === "--"}
        >
          Vérifier
        </button>
      </section>

      <section className={styles.form_container}>
        <p>{outcomeIndicator === null ? "" : outcomeIndicator ? "✅" : "❌"}</p>
        <h4>
          Réponses correctes: <span>{streakCount}</span>
        </h4>
        <h4>
          Score élevé: <span>{highScore}</span>
        </h4>
      </section>

      <footer>
        <p>Développé par Esedere Oghenetega.</p>
        <p>un à mille à venir bientôt.</p>
      </footer>
    </main>
  );
};

export default HomePage;
