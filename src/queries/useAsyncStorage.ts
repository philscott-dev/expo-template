import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface AsyncStorageMap {
  key: { value: number }
}

// useQuery hook for AsyncStorage
export const useAsyncStorageQuery = <T extends keyof AsyncStorageMap>(key: T) =>
  useQuery<AsyncStorageMap[T], Error>({
    queryKey: [key],
    queryFn: () => asyncStorageQueryFn(key),
  })

export const asyncStorageQueryFn = async <T extends keyof AsyncStorageMap>(
  key: T,
): Promise<AsyncStorageMap[T]> => {
  try {
    const result = await AsyncStorage.getItem(key)
    if (result) {
      return JSON.parse(result) as AsyncStorageMap[T]
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error getting AsyncStorage key "${key}": ${err.message}`)
    } else {
      throw new Error('Error getting AsyncStorage')
    }
  }

  throw new Error('Invalid QueryKey')
}

// useMutation hook for AsyncStorage
export const useAsyncStorageMutation = <T extends keyof AsyncStorageMap>(key: T) => {
  const queryClient = useQueryClient()
  return useMutation<unknown, Error, AsyncStorageMap[T]>({
    mutationFn: (update) => {
      try {
        return AsyncStorage.setItem(key, JSON.stringify(update))
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(`Error setting AsyncStorage key "${key}": ${err.message}`)
        } else {
          throw new Error('Error setting AsyncStorage')
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      })
    },
  })
}
