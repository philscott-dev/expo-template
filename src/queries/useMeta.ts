import { Meta } from '@/src/database/schema/MetaSchema'
import { useDatabase } from '@/src/hooks/useDatabase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UpdateResult } from 'kysely'

// useQuery hook for AsyncStorage
export const useMetaQuery = () => {
  const db = useDatabase()
  return useQuery({
    queryKey: ['meta'],
    queryFn: async () =>
      db
        .selectFrom('meta')
        .select(['key', 'value'])
        .where('key', 'in', ['initialized', 'is_first_use'])
        .execute(),
  })
}

export const useUpdateMetaMutation = () => {
  const db = useDatabase()
  const queryClient = useQueryClient()
  return useMutation<UpdateResult, Error, { key: string; value: string | boolean | number }>({
    mutationFn: (update) => updateMetaMutationFn(db, update),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
    },
  })
}

export const updateMetaMutationFn = async (
  db: Database,
  { key, value }: { key: string; value: string | number | boolean },
) => {
  try {
    return db.updateTable('meta').set({ value }).where('key', '=', key).executeTakeFirst()
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error setting Profile`)
    } else {
      throw new Error('Error setting Profile')
    }
  }
}
