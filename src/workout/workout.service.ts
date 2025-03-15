import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

interface OpenAIResponse {
  choices: { text: string }[];
}

@Injectable()
export class WorkoutService {
  async getAIWorkoutRecommendation(userMetrics): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      throw new InternalServerErrorException('Missing OpenAI API Key');
    }

    try {
      const response = await axios.post<OpenAIResponse>(
        'https://api.openai.com/v1/completions',
        {
          prompt: `Suggest a workout plan for a ${userMetrics.weight}kg person with ${userMetrics.fitnessLevel} fitness level.`,
          model: 'gpt-3.5-turbo',
          max_tokens: 50
        },
        {
          headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        }
      );

      return response.data.choices?.[0]?.text || 'No recommendation available.';
    } catch (error) {
      console.error('Error fetching workout plan:', error);
      throw new InternalServerErrorException('Failed to get workout recommendation.');
    }
  }
}

