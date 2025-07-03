/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Cell, Graph, NodeView } from '@antv/x6'
import { debounce } from 'lodash-es'
import { MIN_ZOOM, MAX_ZOOM, DRAGAI_ANCHOR, DRAGAI_ROUTER } from '@/utils/const'
import { registerEvents } from '@/utils/common/events'
import { registerShortcuts } from '@/utils/common/shortcuts'

const createFlowChart = (
  container: HTMLDivElement,
  miniMapContainer: HTMLDivElement
): Graph => {
  const flowGraph = new Graph({
    autoResize: true,
    container,
    rotating: false,
    resizing: false,
    onEdgeLabelRendered: (args): any => {
      const { edge, selectors, label } = args
      const content = selectors.foContent as HTMLElement
      if (content) {
        content.style.display = 'flex'
        content.style.alignItems = 'center'
        content.style.justifyContent = 'center'
        content.style.overflow = 'hidden'
        if (label?.attrs?.label.text === '+') {
          const showContextPad = debounce((info: any) => {
            void flowGraph.trigger('graph:showContextPad', info)
          }, 100)
          const handleOnClick = (event: MouseEvent) => {
            showContextPad({
              x: event.clientX,
              y: event.clientY,
              edge
            })
          }
          // 这里建议用原生 DOM 创建按钮替代 React/Antd
          const btn = document.createElement('button')
          btn.textContent = '+'
          btn.className = 'liteflow-edge-add-button'
          btn.style.fontSize = '12px'
          btn.style.padding = '0 4px'
          btn.onclick = handleOnClick
          content.appendChild(btn)
        } else {
          content.appendChild(
            document.createTextNode(label?.attrs?.label.text + '')
          )
        }
      }
    },
    clipboard: {
      enabled: true,
      useLocalStorage: true
    },
    connecting: {
      snap: true,
      allowBlank: false,
      allowLoop: false,
      allowNode: false,
      allowEdge: false,
      dangling: true,
      highlight: true,
      anchor: DRAGAI_ANCHOR,
      connectionPoint: 'bbox',
      connector: {
        name: 'rounded',
        args: {
          radius: 8
        }
      },
      router: DRAGAI_ROUTER,
      validateEdge: (args) => {
        const { edge } = args
        return !!(edge?.target as any)?.port
      },
      validateConnection({
        sourceView,
        targetView,
        sourceMagnet,
        targetMagnet
      }) {
        if (!sourceMagnet) {
          return false
        } else if (!targetMagnet) {
          return false
        } else {
          return sourceView !== targetView
        }
      }
    },
    background: {
      color: '#f4f7fc'
    },
    grid: {
      visible: true
    },
    selecting: {
      enabled: true,
      rubberband: false,
      movable: true,
      multiple: true,
      strict: true,
      showNodeSelectionBox: true,
      selectNodeOnMoved: true,
      pointerEvents: 'none'
    },
    snapline: {
      enabled: true,
      clean: 100
    },
    keyboard: {
      enabled: true,
      global: false
    },
    history: {
      enabled: true,
      beforeAddCommand(_: any, args: any) {
        if (args.options) {
          return args.options.ignore !== true
        }
      }
    },
    minimap: {
      width: 150,
      height: 150,
      minScale: MIN_ZOOM,
      maxScale: MAX_ZOOM,
      enabled: true,
      scalable: false,
      container: miniMapContainer,
      graphOptions: {
        async: true,
        getCellView(cell: Cell) {
          if (cell.isNode()) {
            return NodeView.registry.get('react-shape-view')
          }
        },
        createCellView(cell: Cell) {
          if (cell.isEdge()) {
            return null
          }
        }
      }
    },
    scroller: {
      enabled: true,
      pageVisible: false,
      pageBreak: false,
      pannable: true
    },
    mousewheel: {
      enabled: true,
      minScale: MIN_ZOOM,
      maxScale: MAX_ZOOM,
      modifiers: ['ctrl', 'meta']
    },
    interacting: {
      nodeMovable: true,
      edgeLabelMovable: false
    }
  })
  registerEvents(flowGraph)
  registerShortcuts(flowGraph)
  return flowGraph
}

export default createFlowChart
