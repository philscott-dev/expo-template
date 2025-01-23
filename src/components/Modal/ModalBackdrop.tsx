import React from 'react'
import Animated, { interpolate, useAnimatedStyle, Extrapolation } from 'react-native-reanimated'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

interface CustomBackdropProps {
  animatedIndex: Animated.SharedValue<number>
  onPress?: () => void
}

const CustomBackdrop: React.FC<CustomBackdropProps> = ({ animatedIndex, onPress }) => {
  // Interpolate the opacity based on the bottom sheet index
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0, 1], // Input range (bottom sheet index)
      [0, 0.5, 0.7], // Output range (opacity levels)
      Extrapolation.CLAMP,
    )

    return {
      opacity,
    }
  })

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.backdrop, animatedStyle]} />
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject, // Covers the whole screen
    backgroundColor: 'black', // Backdrop color
  },
})

export default CustomBackdrop
