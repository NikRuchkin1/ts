import * as crypto from 'crypto';

export default class SecurityService {
    static generatePasswordHash(password: string): string {
        let secretWord = 'typescript'
        return crypto.createHmac('shal', secretWord).update(password).digest('hex');
    }

    static validatePassword(password: string, hash: string){
        return SecurityService.generatePasswordHash(password) === hash;
    }
}