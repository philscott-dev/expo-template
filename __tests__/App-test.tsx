import React from 'react'
import { render } from '@testing-library/react-native'

import AppLayout from '@/src/app/_layout'
import { useMetaQuery } from '@/src/queries/useMeta'

// TODO: tm1
jest.mock('kysely-expo', () => ({
  KyselyProvider: jest.fn(),
}))

jest.mock('@/queries/useMeta', () => ({
  useMetaQuery: jest.fn(),
}))

const useMetaQueryMock = useMetaQuery as jest.Mock

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    useMetaQueryMock.mockReturnValue({
      data: [
        { key: 'initialized', value: 'true' },
        { key: 'is_first_use', value: 'false' },
      ],
      isLoading: false,
      isError: false,
    })

    render(<AppLayout />)
  })
})
