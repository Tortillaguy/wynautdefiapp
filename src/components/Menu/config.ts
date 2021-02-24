import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Wynaut',
        href: 'https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x067a5ad3f0f91acf512ffe66ea77f37b4dcaaf18',
      },
      {
        label: 'Meowth',
        href: 'https://exchange.pancakeswap.finance/#/swap?inputCurrency=0xE561479bEbEE0e606c19bB1973Fc4761613e3C42',
      },
    ],
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Medium',
        href: 'https://medium.com/@wynautcommunity',
      },
      {
        label: 'Wynaut Contract',
        href: 'https://bscscan.com/token/0x067a5ad3f0f91acf512ffe66ea77f37b4dcaaf18',
      },
      {
        label: 'Meowth Contract',
        href: 'https://bscscan.com/token/0xE561479bEbEE0e606c19bB1973Fc4761613e3C42',
      }
    ],
  }
]

export default config
