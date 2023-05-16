import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
    async login({ request, response, auth}: HttpContextContract) {
        const { email, password } = request.only(['email', 'password'])
     response.ok(auth))
    }
}
