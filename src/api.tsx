///fetcher function
// React Query 사용하기 위해
// Fetcer 함수는 반드시 fetch promise를 return 해줘야한다
///////////////////////////////////////////////////////////////////////////

// export async function fetchCoins() {
//   const response = await fetch("https://api.coinpaprika.com/v1/coins");
//   const json = await response.json();
//   return json;
// }

///////////////////////////////////////////////////////////////////////////

const BASE_URL = `https://api.coinpaprika.com/v1`;
const NICO_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}
export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // JS의 Date.now() 반환값 단위: 밀리s
  const startDate = endDate - 60 * 60 * 24 * 7; //1주일 전

  return fetch(
    // api문서에서 startDate, endDate를 필수로 요구하고 있음 => query parameter로 전달
    `${NICO_URL}?coinId=${coinId}&start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
