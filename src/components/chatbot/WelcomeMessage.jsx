import WelcomeText from '../../assets/welcomeText.svg?react'

const WelcomeMessage = () => {
  const svgStyle = {
    maxWidth: '85%',
    height: 'auto',
  }

  return <WelcomeText style={svgStyle} />
}

export default WelcomeMessage
