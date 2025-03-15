import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

interface OpenAIResponse {
  choices: { text: string }[];
}

@Injectable()
export class MealService {
  async getAIMealPlan(userMetrics): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables.');
    }

    const response = await axios.post<OpenAIResponse>(
      'https://api.openai.com/v1/completions',
      {
        prompt: `Suggest a meal plan for a ${userMetrics.weight}kg person with ${userMetrics.dietPreference} diet.`,
        model: 'gpt-3.5-turbo',
        max_tokens: 50,
      },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    return response.data.choices[0]?.text || 'No response from AI.';
  }
}
