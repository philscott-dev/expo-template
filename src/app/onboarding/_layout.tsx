import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { useUpdateMetaMutation } from '@/src/queries/useMeta'

export default function OnboardingLayout() {
  const { mutate } = useUpdateMetaMutation()
  const handleCancel = () => {
    mutate({
      key: 'is_first_use',
      value: false,
    })
    router.replace('/(main)/screeny')
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Onboarding',
          headerRight: () => (
            <TouchableOpacity onPress={handleCancel}>
              <FontAwesome size={28} name="times" color={'black'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="how-to" />
    </Stack>
  )
}
