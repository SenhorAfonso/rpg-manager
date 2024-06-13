import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel, Content, Part, TextPart } from '@google/generative-ai';
import { Inject, Injectable } from '@nestjs/common';

interface geminiConfig {
  temperature?: number,
  topP?: number,
  topK?: number,
  maxOutputTokens?: number,
  responseMimeType?: string
}

@Injectable()
class Gemini {
  private readonly model: GenerativeModel;

  constructor(
    private readonly configService: ConfigService,
    private readonly genAI: GoogleGenerativeAI,
    @Inject('GEMINI_CONFIG') private readonly config: geminiConfig
  ) {
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.model.apiKey = this.configService.get<string>('GEMINI_API_KEY');
  }

  createChatSession(history: any[]) {
    const newHistory: Content[] = [];
    history.forEach(element => {
      const part = {
        role: element.role as string,
        parts: [{ text: element.parts[0] }]
      };
      newHistory.push(part);
    });

    return this.model.startChat({
      generationConfig: this.config,
      history: newHistory
    });
  }

  async sendPrompt(history: any[], prompt) {
    const chat = this.createChatSession(history);

    const response = (await chat.sendMessage(prompt)).response.text();
    return response;
  }

}

export default Gemini;