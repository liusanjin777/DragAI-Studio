/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { onMounted, onUnmounted, type Ref } from 'vue'

type EventType = MouseEvent | TouchEvent
type TargetElement = HTMLElement | Element | Document | Window
type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | Ref<T | null | undefined>

const defaultEvent = 'click'

const getTargetElement = (
  target: BasicTarget<TargetElement>,
  defaultElement?: TargetElement
): TargetElement | undefined | null => {
  if (!target) {
    return defaultElement
  }

  let targetElement: TargetElement | undefined | null
  if (typeof target === 'function') {
    targetElement = target()
  } else if ('value' in target) {
    targetElement = target.value
  } else {
    targetElement = target
  }

  return targetElement
}

const useClickAway = (
  onClickAway: (event: EventType) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string = defaultEvent
) => {
  const handler = (event: any) => {
    const targets = Array.isArray(target) ? target : [target]
    if (
      targets.some((targetItem) => {
        const targetElement = getTargetElement(targetItem) as HTMLElement
        return !targetElement || targetElement?.contains(event.target)
      })
    ) {
      return
    }
    onClickAway(event)
  }

  onMounted(() => {
    document.addEventListener(eventName, handler)
  })

  onUnmounted(() => {
    document.removeEventListener(eventName, handler)
  })
}

export default useClickAway
