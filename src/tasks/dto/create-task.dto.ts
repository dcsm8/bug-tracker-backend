import { IsEnum, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { CategoryType } from '../enums/category-type.enum';
import { ReproducibleType } from '../enums/reproducible-type.enum';
import { SeverityType } from '../enums/severity-type.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  @IsEnum(SeverityType)
  readonly priority?: SeverityType;

  @IsOptional()
  @IsEnum(CategoryType)
  readonly category?: CategoryType;

  @IsOptional()
  @IsEnum(ReproducibleType)
  readonly reproducible?: ReproducibleType;

  @IsOptional()
  @IsPositive()
  readonly assignedToId?: number;

  @IsOptional()
  @IsPositive()
  readonly areaId?: number;

  @IsOptional()
  readonly description?: string;
}
