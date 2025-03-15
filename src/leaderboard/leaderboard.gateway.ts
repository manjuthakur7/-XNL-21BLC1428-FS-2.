import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import { LeaderboardEntry } from 'src/leaderboard/leaderboard-entry.model'; // Ensure correct import

@WebSocketGateway()
export class LeaderboardGateway {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @SubscribeMessage('getLeaderboard')
  async getLeaderboard(): Promise<LeaderboardEntry[]> {  // Explicitly define return type
    return this.leaderboardService.getTopUsers();
  }
}
