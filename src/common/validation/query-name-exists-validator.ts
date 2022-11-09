import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { QueryService } from 'src/api/query/query.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class QueryNameExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly queryService: QueryService) {}

  async validate(value: any, args?: ValidationArguments) {
    if (value) {
      console.log(args);
      const query = await this.queryService.getQueryApi({ name: value });
      return !query.length;
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} ${validationArguments.value} is exists`;
  }
}

export function IsNameQueryExists(validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsNameQueryExists',
      target: object.constructor,
      constraints: [],
      propertyName,
      options: validationOption,
      validator: QueryNameExistsValidator,
      async: true,
    });
  };
}
