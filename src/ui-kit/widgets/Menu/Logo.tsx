import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text } from '@pancakeswap-libs/uikit'
import { LogoIcon } from '../../components/Svg'
import Flex from '../../components/Flex/Flex'
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from './icons'
import MenuButton from './MenuButton'

interface Props {
  isPushed: boolean
  isDark: boolean
  isMobile: boolean
  togglePush: () => void
  href: string
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 156px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`

const LogoImage = styled.img`
`

const HeaderLink = styled(Text)`
  padding: 0px 10px;
  text-transform: uppercase;
  font-weight: 700;
`

const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href, isMobile }) => {
  const isAbsoluteUrl = href.startsWith('http')
  const innerLogo = (
    <>
      <LogoImage src="/images/team-rocket-logo.png" alt="team-rocket-logo" width={32} height={32} />
      <HeaderLink color="text" >
        TEAM ROCKET FINANCE
      </HeaderLink>
    </>
  )

  return (
    <Flex>
      {isMobile && (
        <MenuButton aria-label="Toggle menu" onClick={togglePush} mr="8px">
          {isPushed ? (
            <HamburgerCloseIcon width="24px" color="textSubtle" />
          ) : (
            <HamburgerIcon width="24px" color="textSubtle" />
          )}
        </MenuButton>
      )}
      {isAbsoluteUrl ? (
        <StyledLink style={{ paddingLeft: !isMobile ? 20 : 0 }} as="a" href={href} aria-label="Team Rocket Finance home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink style={{ paddingLeft: !isMobile ? 20 : 0 }} to={href} aria-label="Team Rocket Finance page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  )
}

export default Logo
