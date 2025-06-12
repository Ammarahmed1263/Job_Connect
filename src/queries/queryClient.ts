import { QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 25 hours
      staleTime: 1000 * 60 * 15, // 15 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected)
  })
})


if (typeof window !== 'undefined') {
  const asyncStoragePersistor = createAsyncStoragePersister({
    storage: AsyncStorage,
  })

  persistQueryClient({
    queryClient,
    persister: asyncStoragePersistor,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  })
}

export default queryClient
