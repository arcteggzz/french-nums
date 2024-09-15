export interface Conjugations {
  Je: string;
  Tu: string;
  IlElleOn: string;
  Nous: string;
  Vous: string;
  IlsElles: string;
}

export interface VerbConjugation {
  infinitif: string;
  present: Conjugations;
  imperfect: Conjugations;
  perfect: Conjugations;
  futur: Conjugations;
  subjonctifPresent: Conjugations;
  conditionnelPresent: Conjugations;
  plusQuePerfect: Conjugations;
}
