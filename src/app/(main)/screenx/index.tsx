import { View, Text, StyleSheet } from 'react-native'

export default function ScreenX() {
  return (
    <View style={styles.container}>
      <Text>ScreenX</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
