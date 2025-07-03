import Save from './save.vue'
import Selection from './selection.vue'
import Undo from './undo.vue'
import Redo from './redo.vue'
import Zoom from './zoom.vue'
import FitWindow from './fitWindow.vue'

export const tools = [[Zoom], [FitWindow, Undo, Redo, Selection, Save]]

export default tools
