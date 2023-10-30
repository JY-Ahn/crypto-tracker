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

export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
