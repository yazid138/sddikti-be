import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: string, args?: ValidationArguments) {
    const [model, property = 'id', exceptField = null] = args.constraints;
    if (!value && !model) return false;

    const record = await this.prismaService[model].findUnique({
      where: {
        [property]: value,
      },
    });

    if (record === null) return true;

    if (!exceptField) return false;

    const exceptFieldValue = (args.object as any)[exceptField];
    if (!exceptFieldValue) return false;

    return record[exceptField] === exceptFieldValue;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} ${validationArguments.value} is exists`;
  }
}

export function IsUnique(
  model: string,
  uniqueField: string,
  exceptField: string = null,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      constraints: [model, uniqueField, exceptField],
      propertyName,
      options: validationOptions,
      validator: UniqueValidator,
      async: true,
    });
  };
}
