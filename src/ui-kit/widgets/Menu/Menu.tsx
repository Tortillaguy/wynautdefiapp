import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'
import { Link, BaseLayout, SvgProps } from '@pancakeswap-libs/uikit'
import Overlay from '../../components/Overlay/Overlay'
import { Flex } from '../../components/Flex'
import { Dropdown } from '../../components/Dropdown'
import { Button } from '../../components/Button'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { Text } from '../../components/Text'
import Skeleton from '../../components/Skeleton/Skeleton'
import { Tag, TagVariants } from '../../components/Tag'
import { useMatchBreakpoints } from '../../hooks'
import Logo from './Logo'
import Panel from './Panel'
import UserBlock from './UserBlock'
import { NavProps } from './types'
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL, socials } from './config'
import Avatar from './Avatar'
import MenuLink from './MenuLink'
import MeowthCoin from '../../components/Svg/Icons/MeowthCoin'
import WynautCoin from '../../components/Svg/Icons/WynautCoin'

import * as IconModule from './icons'

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> }

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }
`

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`
const HeaderLink = styled(Link)`
  padding: 0px 10px;
  text-transform: uppercase;
  cursor: pointer;
`

const HeaderMenu = styled(Link)`
  padding: 0px 10px;
  text-transform: uppercase;
  cursor: pointer;

  :hover {
    text-decoration: none;
  }
`

const StyledDropdown = styled(Dropdown)`
  cursor: pointer;
  text-align: center;
`

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`

const Row = styled.div`
  display: flex;
  & > input + input {
    margin-left: 16px;
  }
`

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  wynautPriceUsd,
  links,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  const [isPushed, setIsPushed] = useState(!isMobile)
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === 'Home')

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <div style={{ width: !isMobile && 280 }}>
          <Logo
            isPushed={isPushed}
            togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
            isDark={isDark}
            isMobile={isMobile}
            href={homeLink?.href ?? '/'}
          />
        </div>
        {!isMobile && (
          <Flex>
            <HeaderLink href="/" color="text">
              Home
            </HeaderLink>
            <HeaderLink href="/pools" color="text">
              Pools
            </HeaderLink>
            <HeaderLink href="/farms" color="text">
              Farms
            </HeaderLink>
            <HeaderMenu color="text">
              <StyledDropdown position="bottom" target={<>Trade</>}>
                <Text mt="8px">
                  <Breadcrumbs separator={<>|</>}>
                    <Text color="text" style={{ fontWeight: 'normal', textTransform: 'none' }}>
                      Wynaut
                    </Text>
                    <Link
                      href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x067a5ad3f0f91acf512ffe66ea77f37b4dcaaf18"
                      color="primary"
                      external
                      style={{ fontWeight: 'normal', textTransform: 'none' }}
                    >
                      Exchange
                    </Link>
                    <Link
                      href="https://exchange.pancakeswap.finance/#/add/ETH/0x067a5ad3f0f91acf512ffe66ea77f37b4dcaaf18"
                      color="primary"
                      external
                      style={{ fontWeight: 'normal', textTransform: 'none' }}
                    >
                      Liquidity
                    </Link>
                  </Breadcrumbs>
                </Text>
                <Text mt="8px">
                  <Breadcrumbs separator={<>|</>}>
                    <Text color="text" style={{ fontWeight: 'normal', textTransform: 'none' }}>
                      Meowth
                    </Text>
                    <Link
                      href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0xE561479bEbEE0e606c19bB1973Fc4761613e3C42"
                      color="primary"
                      external
                      style={{ fontWeight: 'normal', textTransform: 'none' }}
                    >
                      Exchange
                    </Link>
                    <Link
                      href="https://exchange.pancakeswap.finance/#/add/ETH/0xE561479bEbEE0e606c19bB1973Fc4761613e3C42"
                      color="primary"
                      external
                      style={{ fontWeight: 'normal', textTransform: 'none' }}
                    >
                      Liquidity
                    </Link>
                  </Breadcrumbs>
                </Text>
              </StyledDropdown>
            </HeaderMenu>
            <HeaderMenu color="text">
              <StyledDropdown position="bottom" target={<>INFO</>}>
                {/* {socials.map((social, index) => {
                  const Icon = Icons[social.icon];
                  const iconProps = { width: "24px", color: "textSubtle", style: { cursor: "pointer" } };
                  const mr = index < socials.length - 1 ? "24px" : 0;
                  if (social.items) {
                    return (
                      <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>
                        {}
                      </Dropdown>
                    );
                  }
                  return (
                    <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
                      <Icon {...iconProps} />
                    </Link>
                  );
                })} */}

                <Link
                  href="https://medium.com/@wynautcommunity"
                  color="primary"
                  external
                  style={{ fontWeight: 'normal', textTransform: 'none', textAlign: 'center' }}
                >
                  Medium
                </Link>
                <Link
                  href="https://t.me/whynotrebuild"
                  color="primary"
                  external
                  style={{ fontWeight: 'normal', textTransform: 'none', textAlign: 'center' }}
                >
                  Telegram
                </Link>
                <Link
                  href="https://twitter.com/WynautCommunity"
                  color="primary"
                  external
                  style={{ fontWeight: 'normal', textTransform: 'none', textAlign: 'center' }}
                >
                  Twitter
                </Link>
                <Link
                  href="https://bscscan.com/token/0x067a5ad3f0f91acf512ffe66ea77f37b4dcaaf18"
                  color="primary"
                  style={{ fontWeight: 'normal', textTransform: 'none', textAlign: 'center' }}
                >
                  Wynaut Contract
                </Link>
                <Link
                  href="https://bscscan.com/token/0xE561479bEbEE0e606c19bB1973Fc4761613e3C42"
                  color="primary"
                  style={{ fontWeight: 'normal', textTransform: 'none', textAlign: 'center' }}
                >
                  Meowth Contract
                </Link>
              </StyledDropdown>
            </HeaderMenu>
          </Flex>
        )}
        <Row>
          {!isMobile && (
            <>
              <div style={{ marginTop: 2, marginRight: 10 }}>
                <Tag variant="secondary" startIcon={<WynautCoin style={{marginRight: 10, marginLeft: 3}} />} outline>
                  {cakePriceUsd ? (
                    <PriceLink
                      href="https://pancakeswap.info/token/0x067a5ad3f0f91acf512ffe66ea77f37b4dcaaf18"
                      target="_blank"
                    >
                      <Text color="secondary">{`$${wynautPriceUsd.toFixed(3)}`}</Text>
                    </PriceLink>
                  ) : (
                    <Skeleton width={80} height={24} />
                  )}
                </Tag>
              </div>
              <div style={{ marginTop: 2, marginRight: 10 }}>
                <Tag variant="secondary" startIcon={<MeowthCoin />} outline>
                  {cakePriceUsd ? (
                    <PriceLink
                      href="https://pancakeswap.info/token/0xE561479bEbEE0e606c19bB1973Fc4761613e3C42"
                      target="_blank"
                    >
                      <Text color="secondary">{`$${cakePriceUsd.toFixed(3)}`}</Text>
                    </PriceLink>
                  ) : (
                    <Skeleton width={80} height={24} />
                  )}
                </Tag>
              </div>
            </>
          )}
          <UserBlock account={account} login={login} logout={logout} />
        </Row>
      </StyledNav>
      <BodyWrapper>
        <Inner isPushed={false} showMenu={showMenu}>
          {children}
        </Inner>
        {isMobile && (
          <Panel
            isPushed={isPushed}
            isMobile={isMobile}
            showMenu={showMenu}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            wynautPriceUsd={wynautPriceUsd}
            pushNav={setIsPushed}
            links={links}
          />
        )}
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  )
}

export default Menu
