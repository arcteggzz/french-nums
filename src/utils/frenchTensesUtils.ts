import { tenseVerbList } from "./tensesList";
import { VerbConjugation, Conjugations } from "../types";

export const subjectList = [
  {
    title: "Je",
    value: "Je",
  },
  {
    title: "Tu",
    value: "Tu",
  },
  {
    title: "Il/Elle/On",
    value: "IlElleOn",
  },
  {
    title: "Nous",
    value: "Nous",
  },
  {
    title: "Vous",
    value: "Vous",
  },
  {
    title: "Ils/Elles",
    value: "IlsElles",
  },
];

export const verbTensesList = [
  {
    title: "Présent",
    value: "present",
  },
  {
    title: "L'imparfait",
    value: "imperfect",
  },
  {
    title: "Passé Composé",
    value: "perfect",
  },
  {
    title: "Futur",
    value: "futur",
  },
  {
    title: "Subjonctif Présent",
    value: "subjonctifPresent",
  },
  {
    title: "Conditionnel Présent",
    value: "conditionnelPresent",
  },
  {
    title: "Plus-que-parfait",
    value: "plusQuePerfect",
  },
];

export function getRandomVerbConjugation(): {
  infinitif: string;
  tense: keyof Omit<VerbConjugation, "infinitif">;
  subject: keyof Conjugations;
  conjugated: string;
} {
  // Select a random verb object
  const randomVerb =
    tenseVerbList[Math.floor(Math.random() * tenseVerbList.length)];

  // Get the list of tenses
  const tenses = Object.keys(randomVerb).filter(
    (key) => key !== "infinitif"
  ) as Array<keyof Omit<VerbConjugation, "infinitif">>;

  // Select a random tense
  const randomTense = tenses[Math.floor(Math.random() * tenses.length)];

  // Get the list of subjects
  const subjects = Object.keys(randomVerb[randomTense]) as Array<
    keyof Conjugations
  >;

  // Select a random subject
  const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

  // Get the conjugated form
  const conjugated = randomVerb[randomTense][randomSubject];

  // Return the result object
  return {
    infinitif: randomVerb.infinitif,
    tense: randomTense,
    subject: randomSubject,
    conjugated,
  };
}
