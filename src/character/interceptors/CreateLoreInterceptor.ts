import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
class CreateLoreInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) { }

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash'
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

    const request = context.switchToHttp().getRequest();
    const { lore, body } = request;

    const run = async () => {
      let prompt: string;
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      if (lore) {
        prompt = `
        Com base nessas informações: ${JSON.stringify(body)} e nas observações fornecidas pelo usuário: ${lore},
        crie uma lore simples para servir de história para um personagem de RPG. Sei que são poucas informações,
        não precisa ser nada muito complexo.`;
      } else {
        prompt = `Com base nessas informações: ${JSON.stringify(body)} crie uma lore simples para servir de
        história para um personagem de RPG. Sei que são poucas informações, não precisa ser nada muito complexo.`;
      }

      const result = await chatSession.sendMessage(prompt);
      request.body.lore = result.response.text();
    };

    await run();
    return next.handle().pipe(
      map(data => data)
    );
  }
}

export default CreateLoreInterceptor;