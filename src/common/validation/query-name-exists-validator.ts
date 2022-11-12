import { RequestContext } from '@medibloc/nestjs-request-context';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { QueryService } from 'src/api/query/query.service';
import { MyRequestContext } from '../context/my-request-context';

@ValidatorConstraint({ async: true })
@Injectable()
export class QueryNameExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly queryService: QueryService) {}

  async validate(value: string) {
    if (value) {
      const ctx = RequestContext.get<MyRequestContext>();
      const api_id = ctx.body['api_id'];
      const query = await this.queryService.getQueryApi({
        name: value,
        apiId: api_id,
      });
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
