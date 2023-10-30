import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";

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
// chrome 검서 창에서 console.log() -> 오른쪽클릭 (temp1,2에 저장)
// Object.keys(temp1).join() 을 통해 key값 문자열로 한번에 가져오기
// Object.values(temp1).map(v => typeof v).join() 을 통해 value의 type 들을 문자열로 한번에 가져오기
// 커맨드: option+shift+i / command+d
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span: first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
function Coin() {
  //userParams: URL에서 필요한 정보를 잡아낼 수 있는 함수
  // string 타입인 coinId를 가지는 parameter를 userParams()가 반환할 것이라는걸 알려줌
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  const [coinInfo, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    // 즉시 실행될 함수 ()();
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false); // 해주지 않으면 계속해서 loading 상태에 머문다
    })();
    // [coinId] : Hook 안에 사용하고 있는 state 를 넣어줘서, 해당 state가 바뀌면 Hook이 실행되도록 해준다
    // [] : 처음에만 Hook이 실행된다. 여기서 coinId는 변할일이 없기 때문에 []로 하든 [coinId]로 하든 결과는 같음
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{coinInfo?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>{coinInfo?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>OPEN SOURCE:</span>
              <span>{coinInfo?.open_source ? "YES" : "NO"}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinInfo?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Coin;
