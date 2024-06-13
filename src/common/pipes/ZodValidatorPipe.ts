import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

class ZodValidatorPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (err){
      throw new BadRequestException('Validation Failed');
    }
  }
}

export default ZodValidatorPipe;