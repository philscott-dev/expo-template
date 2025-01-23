import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'jest-expo',
  verbose: true,

  setupFilesAfterEnv: ['<rootDir>/.jest/jest.setup.js'], // Setup files
  transformIgnorePatterns: [
    '/node_modules/(?!expo-sqlite|@gorhom|@gorhom/portal|@gorhom/bottom-sheet|@dev-plugins/react-query|expo-splash-screen|kysely|@tanstack/react-query|react|@react-native|react-native|expo|@expo|expo-modules-core|expo-router/stack|@react-navigation|kysely-expo|react-native-reanimated|react-native-gesture-handler)',
  ], // Transform specific node_modules
}

export default config
