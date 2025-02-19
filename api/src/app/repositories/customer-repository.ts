import { Customer } from '@app/entities/customer'

export type PaginateParams = {
  customer?: string
  email?: string
  document?: string
  startDate?: Date
  endDate?: Date
  page?: number
  limit?: number
}

export interface CustomersRepository {
  findById(customerId: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  paginate(params: PaginateParams): Promise<Customer[]>
  create(customer: Customer): Promise<void>
  save(customer: Customer): Promise<void>
  delete(customerId: string): Promise<void>
  getCurrentMonthTotalCount(): Promise<number>
  getLastMonthTotalCount(): Promise<number>
}
