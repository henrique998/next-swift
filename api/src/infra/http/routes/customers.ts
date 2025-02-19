import { AddCustomerController } from '@infra/http/controllers/customers/add-customer-controller'
import { GetPaginatedCustomersController } from '@infra/http/controllers/customers/get-paginated-customers-controller'
import { RemoveCustomerController } from '@infra/http/controllers/customers/remove-customer-controller'
import { UpdateCustomerDetailsController } from '@infra/http/controllers/customers/update-customer-details-controller'
import { FastifyInstance } from 'fastify'

const getPaginatedCustomersController = new GetPaginatedCustomersController()
const addCustomerController = new AddCustomerController()
const removeCustomerController = new RemoveCustomerController()
const updateCustomerDetailsController = new UpdateCustomerDetailsController()

export async function customersRoutes(app: FastifyInstance) {
  app.get('/customers', getPaginatedCustomersController.handle)
  app.post('/customers', addCustomerController.handle)
  app.delete('/customers/:customerId/remove', removeCustomerController.handle)
  app.put(
    '/customers/:customerId/update',
    updateCustomerDetailsController.handle,
  )
}
