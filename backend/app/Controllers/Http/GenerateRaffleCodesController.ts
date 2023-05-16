import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import { v4 as uuid } from 'uuid'

export default class GenerateRaffleCodesController {
    public async generate({ response }: HttpContextContract) {
        const code = uuid().split("-")[0].toUpperCase()
        if(!code) throw new BadRequestException("Erro inesperado.", 500)
        
        response.status(200).json({
            code
        })
    }
}
