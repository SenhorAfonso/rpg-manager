import { Injectable } from '@nestjs/common';
import { ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'IsEqualFields', async: false })
@Injectable()
class IsEqualFieldsConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    const [relatedPropertyName] = validationArguments.constraints;
    const relatedValue = (validationArguments.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const [relatedPropertyName] = validationArguments.constraints;
    return `${validationArguments.property} should be equal to ${relatedPropertyName}`;
  }
}

export default IsEqualFieldsConstraint;