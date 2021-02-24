import React, { useCallback, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { provider } from 'web3-core'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useFarms, usePools, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import BigNumber from 'bignumber.js'
import { CAKE_POOL_PID, CAKE_PER_BLOCK, BLOCKS_PER_YEAR } from 'config'
import { PoolCategory, QuoteToken } from 'config/constants/types'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/CardActionsContainer'
import FarmCard from 'views/Farms/components/FarmCard/FarmCard'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  width: 100%;
  text-align: center;
`

const RainbowLight = keyframes` 
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(8px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
  opacity: 0.5;
`

const TotalValueLockedCard = () => {
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const farmsLP = useFarms()
  const pools = usePools(account)

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const cakeRewardPerBlock = CAKE_PER_BLOCK.times(farm.poolWeight)
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        // cakePriceInQuote * cakeRewardPerYear / lpTotalInQuoteToken
        let apy = cakePriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
          apy = cakePriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          apy = cakeRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const cakeApy =
            farm && cakePriceVsBNB.times(cakeRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = cakeApy && dualApy && cakeApy.plus(dualApy)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => {
        let totalValue: BigNumber = new BigNumber('0')

        if (!farm.lpTotalInQuoteToken) {
          totalValue = null
        } else if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = bnbPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          totalValue = cakePrice.times(farm.lpTotalInQuoteToken)
        } else {
          totalValue = farm.lpTotalInQuoteToken
        }

        return totalValue
      })
    },
    [farmsLP, bnbPrice, cakePrice],
  )

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const stakingTokenFarm = farmsLP.find((s) => s.tokenSymbol === pool.stakingTokenName)

    // tmp mulitplier to support ETH farms
    // Will be removed after the price api
    const tempMultiplier = 1

    // /!\ Assume that the farm quote price is BNB
    const stakingTokenPriceInBNB = isBnbPool
      ? new BigNumber(1)
      : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote).times(tempMultiplier)

    const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked)).times(bnbPrice)

    return totalStakingTokenInPool
  })

  const newTvl = [...farmsList(farmsLP, false), ...poolsWithApy].reduce((accumulator, currentValue) =>
    (accumulator || new BigNumber(0)).plus(currentValue),
  )
  const tvlString = newTvl.isNaN() ? null : Number(newTvl).toLocaleString('en-US', { maximumFractionDigits: 0 })
  const TranslateString = useI18n()
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <>
      {/* <StyledCardAccent /> */}
      <StyledTotalValueLockedCard>
        <CardBody style={{ width: '100%', textAlign: 'center' }}>
          <Heading size="lg" mb="24px">
            {TranslateString(762, 'Total Value Locked (TVL)')}
          </Heading>
          {data && tvlString ? (
            <>
              <Heading size="xl">{`$${tvlString}`}</Heading>
              <Text color="textSubtle">{TranslateString(764, 'Across all LPs and Pay Day Pool')}</Text>
            </>
          ) : (
            <>
              <Skeleton height={66} />
            </>
          )}
        </CardBody>
      </StyledTotalValueLockedCard>
    </>
  )
}

export default TotalValueLockedCard
