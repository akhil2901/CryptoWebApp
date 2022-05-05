export const CoinList = () => `https://api.buyucoin.com/ticker/v1.0/liveData`;

export const SingleCoin = (name) =>
  `https://api.buyucoin.com/ticker/v1.0/liveData?symbol=${name}`;
