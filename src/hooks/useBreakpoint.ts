import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import type { ScreenMap } from '@/utils/layout/responsiveObserve'
import ResponsiveObserve from '@/utils/layout/responsiveObserve'

function useBreakpoint(): Ref<ScreenMap> {
  const screens = ref<ScreenMap>({})
  let token: number | null = null
  onMounted(() => {
    token = ResponsiveObserve.subscribe((supportScreens) => {
      screens.value = supportScreens
    })
  })

  onUnmounted(() => {
    ResponsiveObserve.unsubscribe(token as number)
  })

  return screens
}

export default useBreakpoint
