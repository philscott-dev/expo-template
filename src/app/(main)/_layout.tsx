import FontAwesome from '@expo/vector-icons/FontAwesome'
import Octicons from '@expo/vector-icons/Octicons'
import { Tabs } from 'expo-router'

export default function MainTabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="screeny"
        options={{
          tabBarIcon: ({ color }) => <Octicons size={28} name="number" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="screenx"
        options={{
          title: 'Screen X',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
