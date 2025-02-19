import { GeneratePDFReportUseCase } from '@app/usecases/sales/generate-pdf-report-usecase'
import { PGSalesRepository } from '@infra/database/pg/repositories/pg-sales-repository'
import { PDFKitSalesReportProvider } from '@infra/providers/report/pdfkit-sales-report-provider'
import { FastifyReply, FastifyRequest } from 'fastify'
import { randomBytes } from 'node:crypto'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})

export class GeneratePDFReportController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const {
      startDate,
      endDate,
      limit = 10,
      page = 1,
    } = querySchema.parse(req.query)

    const salesRepo = new PGSalesRepository()
    const salesReportProvider = new PDFKitSalesReportProvider()
    const generatePDFReportUseCase = new GeneratePDFReportUseCase(
      salesRepo,
      salesReportProvider,
    )

    const { report } = await generatePDFReportUseCase.execute({
      startDate,
      endDate,
      limit,
      page,
    })

    const hash = randomBytes(6).toString('hex')
    const filename = `${hash}-report.pdf`

    rep.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    rep.header('Content-Disposition', `${filename}`)

    rep.send(report)
  }
}
