import { Dimensions } from 'react-native'

export const screen = Dimensions.get('screen')

const targetScreenHeight = 844
const targetScreenWidth = 390

export const scaleHeight = (size) => {
  return Math.round(size * (screen.height / targetScreenHeight))
}

export const scaleWidth = (size) => {
  return Math.round(size * (screen.width / targetScreenWidth))
}

export const scale = (size) => {
  const targetRatio = targetScreenHeight / targetScreenWidth
  const currentRatio = screen.height / screen.width
  if (currentRatio > targetRatio) {
    return scaleWidth(size)
  } else {
    return scaleHeight(size)
  }
}
