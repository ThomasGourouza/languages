import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as _  from 'lodash';
import { Word } from '../models/word';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
  constructor() { }

  public exportAsExcelFile(words: Array<Word>, excelFileName: string): void {
    const wordsExcel = words.map((word) => {
      return {
        german: word.german,
        translation: word.translation,
        category: word.category,
        numberOfSuccess: word.numberOfSuccess,
        numberOfViews: word.numberOfViews,
        isActive: word.isActive,
      };
    });    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(wordsExcel);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
