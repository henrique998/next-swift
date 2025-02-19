import { AddCustomerUseCase } from '@app/usecases/customers/add-customer-usecase'
import { PGCustomersRepository } from '@infra/database/pg/repositories/pg-customers-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  ddd: z.number(),
  phone: z.number(),
  address: z.object({
    street: z.string(),
    number: z.number(),
    complement: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
  }),
})

export class AddCustomerController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<FastifyReply> {
    const { name, email, cpf, ddd, phone, address } = bodySchema.parse(req.body)

    const customersRepo = new PGCustomersRepository()
    const addCustomerUseCase = new AddCustomerUseCase(customersRepo)

    await addCustomerUseCase.execute({
      name,
      email,
      cpf,
      ddd,
      phone,
      address,
    })

    return rep.send()
  }
}
