import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsDate,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  full_name?: string;

  @IsString()
  @IsOptional()
  gd?: string;

  @IsString()
  @IsOptional()
  mid_name?: string;

  @IsString()
  @IsOptional()
  mob_phone_no?: string;

  @IsString()
  @IsOptional()
  natn?: string;

  @IsString()
  @IsOptional()
  per_adr?: string;

  @IsInt({ message: 'pin must be an integer number' })
  @IsNotEmpty({ message: 'pin should not be empty' })
  pin: number;

  @IsDate()
  @IsOptional()
  pport_expr_date?: Date;

  @IsDate()
  @IsOptional()
  pport_issue_date?: Date;

  @IsString()
  @IsOptional()
  pport_issue_place?: string;

  @IsString()
  @IsOptional()
  sur_name?: string;

  @IsInt()
  @IsOptional()
  tin?: number;

  @IsEnum(['I', 'L'])
  @IsOptional()
  user_type?: 'I' | 'L';

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum([
    'superadmin',
    'admin',
    'moderator',
    'client',
    'admin_app',
    'admin_bin',
    'admin_ptt',
    'admin_cargo',
    'admin_cpt',
    'admin_bts',
  ])
  @IsOptional()
  role: string = 'client'; // default: 'client'

  @IsInt()
  @IsOptional()
  limit?: number;

  @IsEmail({}, { message: 'email must be an email' })
  email: string;

  @IsString()
  @IsOptional()
  birth_place?: string;

  @IsDate()
  @IsOptional()
  birth_date?: Date;

  @IsString()
  @IsOptional()
  pport_no?: string;

  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  ctzn?: string;
}
