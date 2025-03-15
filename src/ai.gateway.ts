import OpenAI from "openai";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AIGateway {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generateRecommendation(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content || "No response generated.";
  }
}
