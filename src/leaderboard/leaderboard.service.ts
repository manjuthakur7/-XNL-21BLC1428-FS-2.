import { Injectable } from '@nestjs/common';

interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
}

@Injectable()
export class LeaderboardService {
  private leaderboard: LeaderboardEntry[] = [];

  addScore(userId: string, username: string, score: number) {
    const existingUser = this.leaderboard.find(entry => entry.userId === userId);
    if (existingUser) {
      existingUser.score += score; // Update score
    } else {
      this.leaderboard.push({ userId, username, score });
    }
    this.sortLeaderboard();
  }

  getTopUsers(limit: number = 10): LeaderboardEntry[] {
    return this.leaderboard.slice(0, limit);
  }

  private sortLeaderboard() {
    this.leaderboard.sort((a, b) => b.score - a.score); // Sort in descending order
  }
}
