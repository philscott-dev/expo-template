import ModalSheet from '@/src/components/Modal/ModalSheet'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function ScreenY() {
  return (
    <View style={styles.container}>
      <Text>ScreenY</Text>
      <Link href="/(main)/screeny/1">Click Me</Link>

      <ModalSheet name="modal-test">
        <Text>test</Text>
      </ModalSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 5, // For Android shadow
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
})
