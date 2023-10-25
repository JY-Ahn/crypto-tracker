import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}
function Coin() {
  //userParams: URL에서 필요한 정보를 잡아낼 수 있는 함수
  // string 타입인 coinId를 가지는 parameter를 userParams()가 반환할 것이라는걸 알려줌
  const coinId = useParams<RouteParams>();
  console.log(coinId);

  return <h1>Coin: {coinId.coinId}</h1>;
}

export default Coin;
