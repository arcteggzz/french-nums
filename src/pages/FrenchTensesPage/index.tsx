import { useState } from "react";
import styles from "./FrenchTensesPage.module.scss";
import { subjectList, verbTensesList } from "../../utils/frenchTensesUtils";
import { getRandomVerbConjugation } from "../../utils/frenchTensesUtils";

const PRE_TEXT = "preText";

type Record = {
  title: string;
  value: string;
};

const preTextHolder: Record = {
  title: PRE_TEXT,
  value: PRE_TEXT,
};

const FrenchTensesPage = () => {
  const [subjectPart, setSubjectPart] = useState<Record>(preTextHolder);
  const [verbPart, setVerbPart] = useState<Record>(preTextHolder);
  const [conjugatedVerbObject, setConjugatedVerbObject] = useState(
    getRandomVerbConjugation()
  );

  const [answerIsCorrect, setAnswerIsCorrect] = useState<boolean | null>(null);
  const [streakCount, setStreakCount] = useState(0);

  const checkAnswer = () => {
    //check anser
    const isCorrect =
      subjectPart.value === conjugatedVerbObject.subject &&
      verbPart.value === conjugatedVerbObject.tense;

    if (isCorrect) {
      //reset input fields
      setSubjectPart(preTextHolder);
      setVerbPart(preTextHolder);

      //generate new test
      const newTest = getRandomVerbConjugation();
      setConjugatedVerbObject(newTest);

      //update counter and game state
      setAnswerIsCorrect(true);
      setStreakCount(streakCount + 1);
    } else {
      setAnswerIsCorrect(false);
      setStreakCount(0);
    }
  };

  const restartGame = () => {
    setAnswerIsCorrect(null);
    setSubjectPart(preTextHolder);
    setVerbPart(preTextHolder);

    //generate new test
    const newTest = getRandomVerbConjugation();
    setConjugatedVerbObject(newTest);
  };

  return (
    <main className={styles.FrenchTensesPage}>
      <div className={styles.page_container}>
        <div className={styles.top_container}>
          <h2>{conjugatedVerbObject.conjugated}</h2>

          {answerIsCorrect === false && (
            <div className={styles.correction_container}>
              <h4>{`The subject is: ${conjugatedVerbObject.subject} and the tense is ${conjugatedVerbObject.tense}`}</h4>
              <button
                onClick={() => restartGame()}
                className={styles.continue_btn}
              >
                Restart Learning
              </button>
            </div>
          )}

          <div className={styles.answer_bucket}>
            <div
              className={
                subjectPart.value === PRE_TEXT
                  ? styles.text_holder
                  : styles.text_filled
              }
            >
              {subjectPart.title}
            </div>
            <div
              className={
                verbPart.value === PRE_TEXT
                  ? styles.text_holder
                  : styles.text_filled
              }
            >
              {verbPart.title}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.button_container}>
            <div className={styles.classes_container}>
              {subjectList.map((subject) => {
                return (
                  <button
                    key={subject.value}
                    onClick={() => setSubjectPart(subject)}
                  >
                    {subject.title}
                  </button>
                );
              })}
            </div>

            <div className={styles.classes_container}>
              {verbTensesList.map((verb) => {
                return (
                  <button key={verb.title} onClick={() => setVerbPart(verb)}>
                    {verb.title}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className={styles.check_button}
            disabled={
              subjectPart.value === PRE_TEXT ||
              verbPart.value === PRE_TEXT ||
              answerIsCorrect === false
            }
            onClick={() => {
              checkAnswer();
            }}
          >
            Vérifier
          </button>

          <p style={{ textAlign: "center" }}>
            {answerIsCorrect === null ? "" : answerIsCorrect ? "✅" : "❌"}
          </p>
          <h4>
            Réponses correctes: <span>{streakCount}</span>
          </h4>
        </div>
      </div>
    </main>
  );
};

export default FrenchTensesPage;
