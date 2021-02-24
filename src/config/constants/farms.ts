import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'MEOWTH',
    lpAddresses: {
      97: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
      56: '0xE561479bEbEE0e606c19bB1973Fc4761613e3C42',
    },
    tokenSymbol: 'PERRSERKER',
    tokenAddresses: {
      97: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
      56: '0xE561479bEbEE0e606c19bB1973Fc4761613e3C42',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    order: 0,
    rewardMultiplier: 1,
  },
  {
    pid: 1,
    lpSymbol: 'MEOWTH-BNB LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      56: '0x730E2065b9dAeE84C3003C05Bf6D2b3A08e55667',
    },
    tokenSymbol: 'MEOWTH',
    tokenAddresses: {
      97: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
      56: '0xE561479bEbEE0e606c19bB1973Fc4761613e3C42',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    order: 1,
    rewardMultiplier: 1,
  },
  {
    pid: 4,
    lpSymbol: 'WYNAUT-MEOWTH LP',
    lpAddresses: {
      97: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      56: '0x2662b8c894774FA639b31b14f6CbD1028d7c54AE',
    },
    tokenSymbol: 'WYNAUT',
    tokenAddresses: {
      97: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      56: '0x067a5ad3f0f91acf512ffe66ea77f37b4dcaaf18',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    order: 4,
    rewardMultiplier: 1,
  },
  {
    pid: 2,
    lpSymbol: 'WYNAUT-BNB LP',
    lpAddresses: {
      97: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      56: '0xa8d547d000349b28a4e8c0289e15407c453ad009',
    },
    tokenSymbol: 'WYNAUT',
    tokenAddresses: {
      97: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      56: '0x067a5ad3f0f91acf512ffe66ea77f37b4dcaaf18',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    order: 2,
    rewardMultiplier: 1,
  },

  {
    pid: 3,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    order: 3,
    rewardMultiplier: 1,
  },
]

export default farms
