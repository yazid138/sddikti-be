import { RequestContext } from '@medibloc/nestjs-request-context';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyContext } from '../context/my-context';

@ValidatorConstraint({ async: true })
@Injectable()
export class QueryNameExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: string) {
    const ctx = RequestContext.get<MyContext>();
    const api_id: string = ctx.body['api_id'];
    if (!value && !api_id) return false;
    const query = await this.prismaService.queryApi.findFirst({
      where: { name: value, apiId: api_id },
    });
    return !query;
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
