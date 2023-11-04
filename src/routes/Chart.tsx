import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexCharts from "react-apexcharts";
/* useParams를 사용했을 때 */
/*
function Chart() {
  const params = useParams();
  console.log(params);
  return <h1>Chart:</h1>;
}
export default Chart;
*/

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart... "
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "close",
              data: data?.map((price) => Number(price.close)) ?? [], // ?? 연산자 : undefined나 null 인 경우 우항 리턴
            },
            {
              name: "low",
              data: data?.map((price) => Number(price.low)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
