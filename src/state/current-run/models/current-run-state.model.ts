export interface CurrentRunState {
  levelScores: number[];
  deaths: number[];
  bonuses: number[];
  subtractionCache: number;
  previousScore?: number;
  start?: number;
}
