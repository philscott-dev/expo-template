import { useMetaQuery } from '@/src/queries/useMeta'
import { Redirect } from 'expo-router'

const Index = () => {
  const { data } = useMetaQuery()
  const is_first_use = data?.find((d) => d.key === 'is_first_use')
  return <Redirect href={is_first_use?.value === true ? '/onboarding' : '/tally'} />
}
export default Index
