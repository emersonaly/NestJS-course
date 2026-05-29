import {IsNotEmpty, IsString, IsEmail, MinLength, IsNumber} from 'class-validator'


class CreateUserDto {

    @IsNotEmpty({message: "El nombre es requerido"})
    @IsString({message: "El nombre debe ser una cadena de texto"})
    name: string;

    @IsEmail()
    @IsNotEmpty({message: "El email es requerido"})
    email: string;

    @IsNotEmpty({message: "La contraseña es requerida"})
    @MinLength(6, {message: "La contraseña debe tener al menos 6 caracteres"})
    password: string;

    @IsNotEmpty({message: "El rol es requerido"})
    @IsString({message: "El rol debe ser una cadena de texto"})
    role: string;
}

class UpdateUserDto {

    @IsString()
    @IsNotEmpty({message: "El nombre es requerido"})
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({message: "El email es requerido"})
    email: string;

    @IsString()
    @MinLength(5, {message: "La contraseña debe tener al menos 6 caracteres"})
    @IsNotEmpty({message: "La contraseña es requerida"})
    password: string;

}

export {CreateUserDto, UpdateUserDto}


