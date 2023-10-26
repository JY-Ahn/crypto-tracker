import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}
const Text = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto; // 위아래 여백은 주지 않으면서 좌우는 가운데 정렬
`;
const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 30px;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
interface RouteState {
  name: string;
}
function Coin() {
  //userParams: URL에서 필요한 정보를 잡아낼 수 있는 함수
  // string 타입인 coinId를 가지는 parameter를 userParams()가 반환할 것이라는걸 알려줌
  // const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  console.log(state.name);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
