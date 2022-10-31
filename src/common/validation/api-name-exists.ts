import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as slug from 'slug';
import { ApiService } from 'src/api/api.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ApiNameExists implements ValidatorConstraintInterface {
  constructor(private readonly apiService: ApiService) {}

  async validate(value: string) {
    if (value) {
      const api = await this.apiService.detailApi({
        name: slug(value),
      });
      return !api;
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} ${validationArguments.value} is exists`;
  }
}

export function IsNameApiExists(validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsNameApiExist',
      target: object.constructor,
      constraints: [],
      propertyName,
      options: validationOption,
      validator: ApiNameExists,
      async: true,
    });
  };
}
