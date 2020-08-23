export interface CurrentRunState {
  levelScores: number[];
  deaths: number[];
  bonuses: number[];
  subtractionCache: number;
  currentPace?: number;
  previousScore?: number;
  start?: number;
}
