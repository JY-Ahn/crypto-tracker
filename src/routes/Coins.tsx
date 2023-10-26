import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 30px;
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
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block; // link 글자 바깥까지 적용되게 설정
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor}; // 마우스 올라가면 색깔 전혼
    }
  }
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Loader = styled.span`
  text-align: center;
  display: block;
`;

function Coins() {
  // 1. coins 가 CoinInterface 객체들로 이루어진 배열 이란 것을 알려줌
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Data fetch
  //    useEffect: 언제 실행될지(component가 시작/끝날때 혹은 특정 시점) 정해줄 수 있다
  useEffect(() => {
    // async() 함수는 바로 실행 되고
    // response, json은 기다렸다가(await)
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); // 시작할때만 실행되도록

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {/* map 함수를 이용해서 coins list 를 다 보여줌  */}
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
