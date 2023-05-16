import Hash from '@ioc:Adonis/Core/Hash'

export async function hashPassword(password) {
  return await Hash.make(password);
}
