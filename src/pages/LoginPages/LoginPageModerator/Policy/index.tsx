import { useQuery } from 'react-query';
import { fetchPolicy } from 'services/queries/PartnerQueries';
import { Document, pdfjs } from 'react-pdf';
import { useState } from 'react';
import Spinner from 'components/Custom/Spinner';
import Button from 'components/Custom/Button';
import { Container, CPage, Wrapper, Text } from './style';

interface PProps {
  numPages?: any;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const El = <Spinner height='100vh' />;

const language =
  localStorage.getItem('language') === 'uz'
    ? 3
    : localStorage.getItem('language') === 'ru'
    ? 1
    : 2;

const Policy = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState('');

  const onDocumentLoadSuccess = ({ numPages }: PProps) => {
    setNumPages(numPages);
  };
  const res = useQuery('fetchPolicy', () => fetchPolicy({ language }), {
    onSuccess: (data) => {
      setFile(data?.data?.data[0]?.contentLink);
    },
  });

  const handleNext = () => {
    if (numPages > pageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleBack = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  if (res.isLoading) {
    return <Spinner height='100vh' />;
  }

  return (
    <Container>
      <Document
        noData='Нет файл'
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={El}
      >
        <CPage width={400} scale={2} pageNumber={pageNumber} />
      </Document>
      <Wrapper>
        <Button onClick={handleBack}>Back</Button>
        <Text>
          {pageNumber}/{numPages}
        </Text>
        <Button onClick={handleNext}>Next</Button>
      </Wrapper>
    </Container>
  );
};

export default Policy;
