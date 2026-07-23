import { TOOLTIP_POSITION } from './types'

const PADDING = 12

export function GetTooltipStyle  (rootElement: HTMLElement, position: TOOLTIP_POSITION): string {
  const rect = rootElement.getBoundingClientRect()
  
  switch (position) {
    case TOOLTIP_POSITION.TOP: return topPosition(rect)
    case TOOLTIP_POSITION.TOP_RIGHT: return topRightPosition(rect)
    case TOOLTIP_POSITION.TOP_LEFT: return topLeftPosition(rect)

    case TOOLTIP_POSITION.RIGHT: return rightPosition(rect)
    case TOOLTIP_POSITION.RIGHT_DOWN: return rightDownPosition(rect)
    case TOOLTIP_POSITION.RIGHT_UP: return rightTopPosition(rect)

    case TOOLTIP_POSITION.BOTTOM: return bottomPosition(rect)
    case TOOLTIP_POSITION.BOTTOM_RIGHT: return bottomRightPosition(rect)
    case TOOLTIP_POSITION.BOTTOM_LEFT: return bottomLeftPosition(rect)

    case TOOLTIP_POSITION.LEFT: return leftPosition(rect)
    case TOOLTIP_POSITION.LEFT_DOWN: return leftDownPosition(rect)
    case TOOLTIP_POSITION.LEFT_UP: return leftUpPosition(rect)
    default: return ''
  }
}

function renderStyle (addToStyles: (s: Array<string>) => Array<string>): string {
  const styles = addToStyles([])
  return styles.join(';')
}

function topPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x + (rect.width / 2)
    const y = rect.y - PADDING

    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translate(-50%, -100%)')
    return styles
  })
}

function topRightPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x
    const y = rect.y - PADDING

    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translateY(-100%)')
    return styles
  })
}

function topLeftPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x + rect.width
    const y = rect.y - PADDING

    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translate(-100%, -100%)')
    return styles
  })
}

function rightPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x + rect.width + PADDING
    const y = rect.y + (rect.height / 2)

    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translateY(-50%)')

    return styles
  })  
}

function rightDownPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x + rect.width + PADDING
    const y = rect.y

    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)

    return styles
  })  
}

function rightTopPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x + rect.width + PADDING
    const y = rect.y + rect.height

    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translateY(-100%)')

    return styles
  })  
}

function bottomPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x + (rect.width / 2)
    const y = rect.y + rect.height + PADDING
    
    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translateX(-50%)')
    return styles
  })  
}

function bottomRightPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x
    const y = rect.y + rect.height + PADDING
    
    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    return styles
  })  
}

function bottomLeftPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x + rect.width
    const y = rect.y + rect.height + PADDING
    
    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translateX(-100%)')
    return styles
  })  
}

function leftPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x - PADDING
    const y = rect.y + (rect.height / 2)

    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translate(-100%, -50%)')
    return styles
  })  
}

function leftDownPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x - PADDING
    const y = rect.y

    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translateX(-100%)')
    return styles
  })  
}

function leftUpPosition (rect: DOMRect): string {
  return renderStyle((styles) => {
    const x = rect.x - PADDING
    const y = rect.y + rect.height

    styles.push(`left: ${x}px`)
    styles.push(`top: ${y}px`)
    styles.push('transform: translate(-100%, -100%)')
    return styles
  })  
}
