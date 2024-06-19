import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel, Content } from '@google/generative-ai';
import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/game/schema/game-schema';

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

  createChatSession(context: Context[]) {
    const newContext: Content[] = [];
    context.forEach(element => {
      const part = {
        role: element.role as string,
        parts: [{ text: element.parts[0] }]
      };
      newContext.push(part);
    });

    return this.model.startChat({
      generationConfig: this.config,
      history: newContext
    });
  }

  async sendGamePrompt(context: Context[], prompt: string): Promise<string> {
    const chat = this.createChatSession(context);
    const response = (await chat.sendMessage(prompt)).response.text();

    return response;
  }

  async sendGenericPrompt(prompt: string) {
    const chat = this.createChatSession([]);

    const response = (await chat.sendMessage(prompt)).response.text();
    return response;
  }

}

export default Gemini;