import { FastifyInstance } from 'fastify'
import { GenerateExcelReportController } from '../controllers/sales/generate-excel-report-controller'
import { GeneratePDFReportController } from '../controllers/sales/generate-pdf-report-controller'
import { GetLastSixSalesController } from '../controllers/sales/get-last-six-sales-controller'
import { GetPaginatedSalesController } from '../controllers/sales/get-paginated-sales-controller'
import { SaleProductController } from '../controllers/sales/sale-product-controller'

const saleProductController = new SaleProductController()
const generateExcelReportController = new GenerateExcelReportController()
const generatePDFReportController = new GeneratePDFReportController()
const getLastSixSalesController = new GetLastSixSalesController()
const getPaginatedSalesController = new GetPaginatedSalesController()

export async function salesRoutes(app: FastifyInstance) {
  app.post('/sales', saleProductController.handle)
  app.get('/sales', getPaginatedSalesController.handle)
  app.get('/sales/report/excel', generateExcelReportController.handle)
  app.get('/sales/report/pdf', generatePDFReportController.handle)
  app.get('/sales/last-six', getLastSixSalesController.handle)
}
