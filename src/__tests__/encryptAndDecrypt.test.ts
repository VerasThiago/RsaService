import { RsaService } from '../module/rsaService';

const SECRET_ALGORITHM: string = 'aes-256-ctr'
const SECRET_KEY: string = 'FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs'
const SECRET_IV_LENGTH: string = '16'

it('Testing hello world', async () => {
  expect.assertions(1)
  const rsa: RsaService = RsaService.getSingleton(SECRET_ALGORITHM, SECRET_KEY, SECRET_IV_LENGTH)
  const plainTextBefore: string = 'Hello World'
  const plainTextAfet: string =  rsa.decrypt(rsa.encrypt(plainTextBefore))
  expect(plainTextBefore).toEqual(plainTextAfet)
})
