import PDFDocument from 'pdfkit'

import { Sale } from '@app/entities/sale'
import { PDFSalesReportProvider } from '@app/providers/pdf-sales-report-provider'

export class PDFKitSalesReportProvider implements PDFSalesReportProvider {
  async generate(sales: Sale[]): Promise<Buffer> {
    return new Promise<Buffer>((resolve) => {
      const doc = new PDFDocument()

      doc.fontSize(18).text('Relatório de Compras', { align: 'center' })
      doc.moveDown()

      for (const sale of sales) {
        doc.fontSize(14).text(`Produto: ${sale.productName}`)
        doc.fontSize(12).text(`Quantidade: ${sale.productQty}`)
        doc.fontSize(12).text(`Preço: ${sale.productPrice}`)
        doc.moveDown()
      }

      const buffers: Buffer[] = []

      doc.on('data', (chunk) => buffers.push(chunk))
      doc.on('end', () => {
        const buffer = Buffer.concat(buffers)
        resolve(buffer)
      })

      doc.end()
    })
  }
}
