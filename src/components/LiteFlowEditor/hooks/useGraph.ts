import { inject } from 'vue'
import { GraphKey } from '../context/GraphContext'

export const useGraph = () => {
  const graph = inject(GraphKey)
  return graph
}
