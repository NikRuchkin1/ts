import * as Crypto from 'crypto'

export default class SecurityService {
    static generatePasswordHash(password: string): string {
        let secretWord = 'typescript'
        return Crypto.createHmac('shal', secretWord).update(password).digest('hex');
    }

    static validatePassword(){
    }
}