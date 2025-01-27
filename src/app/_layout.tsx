import React from 'react'
import * as dbconfig from '@/src/database/config'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router/stack'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { KyselyProvider } from 'kysely-expo'
import { Schema } from '@/src/database/schema'
import { onInit } from '@/src/database/migrations'
import { useMetaQuery } from '@/src/queries/useMeta'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PortalHost, PortalProvider } from '@gorhom/portal'
import {
  hideAsync as hideSplashScreenAsync,
  preventAutoHideAsync as preventSplashScreenAutoHideAsync,
} from 'expo-splash-screen'

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding
preventSplashScreenAutoHideAsync()

export default function RootLayoutWrapper() {
  useReactQueryDevTools(queryClient)
  return (
    <GestureHandlerRootView>
      <PortalProvider>
        <KyselyProvider<Schema>
          database={dbconfig.name}
          autoAffinityConversion
          debug
          onInit={(db) => {
            async function initMigrator() {
              const migrator = await onInit(db)
              await migrator.migrateToLatest().then(console.log, console.error)
            }
            initMigrator()
          }}
        >
          <QueryClientProvider client={queryClient}>
            <RootLayout />
          </QueryClientProvider>
        </KyselyProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  )
}

function RootLayout() {
  const { data, isLoading } = useMetaQuery()
  const initialized = data?.find((d) => d.key === 'initialized')
  useEffect(() => {
    if (initialized) {
      hideSplashScreenAsync()
    }
  }, [initialized])

  if (!data || isLoading) {
    return null
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, presentation: 'fullScreenModal', animation: 'none' }}
        />
      </Stack>
      <PortalHost name="modal" />
    </>
  )
}
