import React from 'react'
import styled, { keyframes } from 'styled-components'
import MeowthCoin from './MeowthCoin'
import { SpinnerProps } from './types'

const rotate = keyframes`
  from 
  { 
      transform: rotateY(0deg); 
  } 
  to { 
      transform: rotateY(-360deg); 
  } 
`

const Container = styled.div`
  position: relative;
`

const Rotating = styled(MeowthCoin)`
  animation-name: ${rotate}; 
  animation-timing-function: linear; 
  animation-iteration-count: infinite; 
  animation-duration: 2s; 

`

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <>
    <Container>
      <Rotating width={`${size * 0.5}px`} />
    </Container>
    <div style={{textAlign: 'center'}}>
      <p>Loading...</p>
    </div>
    </>
  )
}

export default Spinner
