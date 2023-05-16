import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(120),
    ]),
    email: schema.string([rules.required(), rules.email()]),
    password: schema.string([
      rules.required(),
      rules.minLength(8),
      rules.maxLength(22),
    ]),
    phone: schema.string([
      rules.required(),
      rules.minLength(8),
      rules.maxLength(11),
    ]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'name.required': 'Por favor, informe um nome.',
    'name.minLength': 'O nome deve ter pelo menos 3 caracteres.',
    'name.maxLength': 'O nome não pode exceder 120 caracteres.',
    'email.required': 'Por favor, informe um endereço de e-mail.',
    'email.email': 'Por favor, informe um endereço de e-mail válido.',
    'password.required': 'Por favor, informe uma senha.',
    'password.minLength': 'A senha deve ter pelo menos 8 caracteres.',
    'password.maxLength': 'A senha não pode exceder 22 caracteres.',
    'phone.required': 'Por favor, informe um número de telefone.',
    'phone.minLength': 'O número de telefone deve ter pelo menos 8 dígitos.',
    'phone.maxLength': 'O número de telefone não pode exceder 11 dígitos.'
  };
}
