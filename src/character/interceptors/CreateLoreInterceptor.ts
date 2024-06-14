import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Gemini from 'src/common/getGemini';
import PromptGenerator from 'src/common/PromptGenerator';

@Injectable()
class CreateLoreInterceptor implements NestInterceptor {
  constructor(
    private readonly gemini: Gemini,
    private readonly promptGenerator: PromptGenerator
  ) { }

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { lore, body } = request;
    let prompt: string;

    if (lore) {
      prompt = this.promptGenerator.createLore(JSON.stringify(body), lore);
    } else {
      prompt = this.promptGenerator.createLore(JSON.stringify(body), lore);;
    }

    request.body.lore = await this.gemini.sendGenericPrompt(prompt);;

    return next.handle().pipe(
      map(data => data)
    );
  }
}

export default CreateLoreInterceptor;