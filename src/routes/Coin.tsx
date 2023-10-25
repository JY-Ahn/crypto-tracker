import { useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}
const Text = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;
function Coin() {
  //userParams: URL에서 필요한 정보를 잡아낼 수 있는 함수
  // string 타입인 coinId를 가지는 parameter를 userParams()가 반환할 것이라는걸 알려줌
  const params = useParams<RouteParams>();

  return <Text>Coin: {params.coinId}</Text>;
}

export default Coin;
