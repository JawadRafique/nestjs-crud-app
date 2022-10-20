import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp'

@Injectable()
export class ExcelService {
    async downloadExcel(data: any) {
        if(!data) {
            throw new NotFoundException('No data to download')
        }

        let rows = []
        data.forEach(doc => {rows.push(Object.values(doc))})

        // Creating a new workbook
        let book = new Workbook();

        // Adding a worksheet to workbook
        let sheet = book.addWorksheet(`sheet1`)

        // Adding the Header
        rows.unshift(Object.keys(data[0]))

        // Adding multiple rows in the sheet
        sheet.addRows(rows)
        
        let File = await new Promise((resolve,reject) => {
            /* Creating a temporary file with the name `MyExcelSheet` and extension `.xlsx` and then
            writing the data to the file. */
            tmp.file({discardDescriptor: true, prefix: 'MyExcelSheet', postfix: ".xlsx", mode: parseInt('0600',8),}, async (err, file) => {
                if(err) throw new BadRequestException(err)
                book.xlsx.writeFile(file).then((_) => {
                    resolve(file)
                }).catch((err) => {throw new BadRequestException(err)})
            })
        })
        return File;
    }
}
