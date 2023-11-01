import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
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
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);
  return <h1></h1>;
}

export default Chart;
