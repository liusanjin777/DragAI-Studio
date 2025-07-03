/* eslint-disable @typescript-eslint/no-floating-promises */
import { Graph } from '@antv/x6'
import { getSelectedEdges } from './flowChartUtils'

export const registerEvents = (flowGraph: Graph): void => {
  flowGraph.on('selection:changed', () => {
    flowGraph.trigger('toolBar:forceUpdate')
    flowGraph.trigger('settingBar:forceUpdate')
  })
  flowGraph.on('edge:selected', (args) => {
    args.edge.attr('line/stroke', '#feb663', { ignore: true })
  })
  flowGraph.on('edge:unselected', (args) => {
    args.edge.attr('line/stroke', '#c1c1c1', { ignore: true })
  })
  flowGraph.on('edge:mouseover', (args) => {
    args.edge.attr('line/stroke', '#feb663', { ignore: true })
  })
  flowGraph.on('edge:mouseleave', (args) => {
    const { edge } = args
    const selectedEdges = getSelectedEdges(flowGraph)
    if (selectedEdges[0] !== edge) {
      args.edge.attr('line/stroke', '#c1c1c1', { ignore: true })
    }
  })
  flowGraph.on('node:dblclick', () => {
    flowGraph.trigger('graph:editNode')
  })
  flowGraph.on('blank:contextmenu', (args) => {
    const {
      e: { clientX, clientY }
    } = args
    flowGraph.cleanSelection()
    flowGraph.trigger('graph:showContextMenu', {
      x: clientX,
      y: clientY,
      scene: 'blank'
    })
  })
  flowGraph.on('node:contextmenu', (args) => {
    const {
      e: { clientX, clientY },
      node
    } = args
    // NOTE: if the clicked node is not in the selected nodes, then clear selection
    if (!flowGraph.getSelectedCells().includes(node)) {
      flowGraph.cleanSelection()
      flowGraph.select(node)
    }
    flowGraph.trigger('graph:showContextMenu', {
      x: clientX,
      y: clientY,
      scene: 'node'
    })
  })
  flowGraph.on('blank:mousedown', () => {
    flowGraph.cleanSelection()
  })
}

export default registerEvents
