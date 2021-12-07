import { fetchChartStatustics } from 'services/queries/statisticsQuery';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';

interface ChartProps {
  startDate?: string;
  endDate?: string;
  chartPeriod?: number;
}

const useChart = () => {
  const resChart = useQuery(
    'fetchChartStatistics',
    () => {
      return fetchChartStatustics({
        url: `startDate=${dayjs()
          .startOf('month')
          .format('YYYY-MM-DD')}&endDate=${dayjs()
          .endOf('month')
          .format('YYYY-MM-DD')}&chartPeriod=1`,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
      retry: 0,
      onSuccess: (data) => {
        // console.log(data, 'stststs');
      },
    }
  );
  return { resChart };
};

export default useChart;
