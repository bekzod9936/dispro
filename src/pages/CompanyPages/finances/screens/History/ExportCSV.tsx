import { ReactComponent as ExcelIcon } from 'assets/icons/FinanceIcons/excel.svg';
import Button from 'components/Custom/Button';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

interface Props {
  csvData?: any;
  date?: {
    startDate?: string;
    endDate?: string;
  };
}

const ExportCSV = ({ csvData, date }: Props) => {
  const { t } = useTranslation();

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  return (
    <Button
      onClick={() => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'array',
        });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(
          data,
          `${t('report')}/${t('from')}${date?.startDate}${t('to')}${
            date?.endDate
          }` + fileExtension
        );
      }}
      startIcon={<ExcelIcon />}
      buttonStyle={{ bgcolor: '#45A13B' }}
    >
      {t('exportexcel')}
    </Button>
  );
};

export default ExportCSV;
