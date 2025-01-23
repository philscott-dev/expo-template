import FontAwesome from '@expo/vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native'
import { Stack } from 'expo-router/stack'
import { useModalStore } from '@/src/stores/useModalStore'

export default function ScreenYLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerRight: HeadRightButton,
        }}
      />
      <Stack.Screen name="[item-id]" options={{ headerShown: true }} />
    </Stack>
  )
}

const HeadRightButton = () => {
  const { setActiveModalName } = useModalStore()
  return (
    <TouchableOpacity onPress={() => setActiveModalName?.('modal-test')}>
      <FontAwesome size={28} name="plus" color={'black'} />
    </TouchableOpacity>
  )
}
