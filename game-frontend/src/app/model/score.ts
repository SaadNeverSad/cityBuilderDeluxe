/**
 * The score of a player, on a certain map.
 */
export class BackendScore {
  playerName: string;
  score: number;

  constructor(playerName: string, score: number) {
    this.playerName = playerName;
    this.score = score;
  }
}
