import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'MEOWTH',
    stakingTokenName: QuoteToken.CAKE,
    stakingTokenAddress: '0xE561479bEbEE0e606c19bB1973Fc4761613e3C42',
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0x2B56AE44435825CeBdB3cbcB15e2458345dA5247',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://teamrocket.app/',
    harvest: true,
    tokenPerBlock: '70',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
