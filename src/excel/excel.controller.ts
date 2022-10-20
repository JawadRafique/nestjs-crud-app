import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './excel.service';
import { data } from './data';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('/download')
  @Header('Content-Type', 'text/xlsx')
  async downloadReport(@Res() res: Response){
    let result = await this.excelService.downloadExcel(data);
    res.download(`${result}`)
  }
}
