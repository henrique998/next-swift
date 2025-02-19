import { Sale } from '@app/entities/sale'
import {
  ExcelSalesReportProvider,
  RevenueParams,
  SalesReportData,
} from '@app/providers/excel-sales-report-provider'
import { Workbook } from 'exceljs'
import { randomBytes } from 'node:crypto'
import { resolve } from 'node:path'

export class ExceljsSalesReportProvider implements ExcelSalesReportProvider {
  async generate(sales: Sale[]): Promise<SalesReportData> {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Sales')

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Product', key: 'productName', width: 30 },
      { header: 'Quantity', key: 'productQuantity', width: 15 },
      { header: 'Price', key: 'productPrice', width: 15 },
      { header: 'Total', key: 'total', width: 20 },
    ]

    for (const sale of sales) {
      worksheet.addRow({
        id: sale.id,
        productName: sale.productName,
        productQuantity: sale.productQty,
        productPrice: sale.productPrice,
        total: sale.total,
      })
    }

    const { filename, fullFilePath } = await this.generateFile(workbook)

    return {
      filename,
      fullFilePath,
    }
  }

  async generateRevenue(params: RevenueParams[]): Promise<SalesReportData> {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Revenue')

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 10 },
      { header: 'Revenue', key: 'revenue', width: 50 },
    ]

    for (const data of params) {
      worksheet.addRow({
        date: data.date,
        revenue: data.revenue,
      })
    }

    const { filename, fullFilePath } = await this.generateFile(workbook)

    return {
      filename,
      fullFilePath,
    }
  }

  private async generateFile(workbook: Workbook) {
    const hash = randomBytes(6).toString('hex')
    const dir = resolve(__dirname, '..', '..', 'uploads', 'report')
    const filename = `${hash}.xlsx`
    const fullFilePath = `${dir}/${filename}`

    await workbook.xlsx.writeFile(fullFilePath, { filename })

    return {
      filename,
      fullFilePath,
    }
  }
}
