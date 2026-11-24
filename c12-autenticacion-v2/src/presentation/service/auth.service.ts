import { JwtAdapter } from "../../config/jwt.adapter.js";
import { CustomError, LoginUserDto, UserEntity, type IUserRepository, type RegisterUserDto } from "../../domain/index.js";
import type { EmailService } from "../../config/email.js";
import { BcryptAdapter } from "../../config/bcrypt.adapter.js";

export class AuthService{
    constructor (
        private readonly userRepository: IUserRepository,
        private readonly emailService: EmailService,
        private readonly webServiceUrl: string // Ej: 'http://localhost:3000/api'
    ){}




    async loginUser(dto: LoginUserDto){
        const userBd = await this.userRepository.findUserByEmail(dto.email);
        if(!userBd)
            throw CustomError.badRequest("Datos incorrectos");
        
        const validPassword = BcryptAdapter.compare(dto.password, userBd.password);
        if(!validPassword)
            throw CustomError.unauthorized("Datos incorrectos");
        

        const {password, ...user} = UserEntity.fromModel( userBd);

        const token = await JwtAdapter.generateToken({id: user.id}, "100m");
        if(!token)
            throw CustomError.internalServer("Error al crear el token");


        return {
            user: user,
            token: token
        }
    }
 



    async registerUser(dto: RegisterUserDto) {
        //  VALIDAR SI EL USUARIO EXISTE
        const existingUser = await this.userRepository.findUserByEmail(dto.email);
        if(existingUser) 
            throw CustomError.badRequest("El email ya está registrado", "AuthService.registerUser");


        //  ENCRIPTAR CONTRASEÑA
        const hashedPassword = BcryptAdapter.hash(dto.password);


        //  CREAR EL USUARIO
        const newUser = await this.userRepository.createUser({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        });


        //  ENVIAR EMAIL DE VALIDACION
        await this.sendEmailValidation(newUser.email);


        //  RETORNAR EL USUARIO SIN EL PASSWORD
        const { password, ...userEntity } = UserEntity.fromModel(newUser);
        return {
            user: userEntity,
        };
    }






    async sendEmailValidation (email: string) {
        //  GENERAR TOKEN CON EL EMAIL ADENTRO (EXPIRA EN 15 MINUTOS)
        const token = await JwtAdapter.generateToken({email}, '15m');
        if(!token) 
            throw CustomError.internalServer("Error al generar el token de validacion", "AuthService.sendEmailValidation");


        //  CONSTRUCIR EL ENLACE QUE RECIBIRA EL USUARIO EN SU CORREO
        const baseUrl = this.webServiceUrl.replace(/\/$/, ""); // Quita la barra final si existe
        const link = `${baseUrl}/auth/validate-email/${token}`;

        const html = `
            <h1>Valida tu correo electrónico</h1>
            <p>Haz clic en el siguiente enlace para activar tu cuenta:</p>
            <a href="${link}">Validar mi correo: ${email}</a>
        `;


        //  ENVIAR CORREO
        const isSent = await this.emailService.sendEmail({
            to: email,
            subject: 'Valida tu cuenta',
            htmlBody: html
        })


        if(!isSent)
            throw CustomError.internalServer("Error al enviar correo de validacion", "AuthService.sendEmailValidation");
    }






    async validateEmail(token: string){
        //  VERIFICAR FIRMA Y EXPERICACIÓN DEL TOKEN
        const payload = await JwtAdapter.validateToken<{ email: string }>(token);
        if (!payload)
            throw CustomError.unauthorized("Token inválido o expirado", "AuthService.validateEmail");


        const { email } = payload;
        if (!email) {
            throw CustomError.internalServer("El email no viene en el token", "AuthService.validateEmail");
        }


        //  BUSCAR EL USUARIO EN LA BD
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw CustomError.notFound("El usuario no existe", "AuthService.validateEmail");
        }

        // ACTUALIZAR EL CAMPO A emaimlValidated = true
        user.emailValidated = true;
        await this.userRepository.updateUser(user.id, user);

        return true;
    }
}