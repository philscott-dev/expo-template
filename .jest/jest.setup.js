import { jest } from '@jest/globals'
import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-gesture-handler', () => {
  const ActualGestureHandler = jest.requireActual('react-native-gesture-handler')
  return {
    ...ActualGestureHandler,
    GestureHandlerRootView: jest.fn(({ children }) => <>{children}</>),
  }
})


jest.mock('@dev-plugins/react-query', () => ({
  useReactQueryDevTools: jest.fn(),
}))

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideSplashScreenAsync: jest.fn(),
}))

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    createNavigatorFactory: jest.fn(),
  }
})

// Mock any other navigation dependencies if required
jest.mock('expo-router/stack', () => ({
  createStackNavigator: jest.fn(),
}))

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}))

// Mock expo modules
jest.mock('expo-file-system', () => ({
  readAsStringAsync: jest.fn().mockResolvedValue('mocked file content'),
  writeAsStringAsync: jest.fn(),
}))

// Mock expo-router and the Redirect component
jest.mock('expo-router', () => ({
  Redirect: jest.fn(() => null), // Return a mock component that renders null
}))

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn().mockResolvedValue(null),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn().mockResolvedValue(null),
}))

// Mock react-native-reanimated (required for animations in Jest)
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

// kysely
jest.mock('kysely-expo', () => ({
  useKysely: jest.fn(),
}))

// react-query
jest.mock('@tanstack/react-query', () => {
  const original = jest.requireActual('@tanstack/react-query')
  return {
    ...original,
    useQuery: jest.fn(),
    QueryClient: original.QueryClient,
  }
})
