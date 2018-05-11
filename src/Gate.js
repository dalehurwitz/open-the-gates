function noop () {}

class Gate {
  constructor ({ elem, onOpen = noop, onClose = noop }) {
    if (!elem) {
      throw Error('An element must be supplied to Gate')
    }

    this.onOpen = onOpen
    this.onClose = onClose

    this.level = 0
    this.direction = 0
    this.listeners = []

    elem.setAttribute('tabIndex', 0)
    elem.addEventListener('wheel', this.onScroll)

    this.update()
  }

  update () {
    requestAnimationFrame(() => {
      if (this.level) {
        if (this.direction === 1) {
          this.onOpen()
        } else {
          this.onClose()
        }
      } else {
        //
      }

      this.update()
    })
  }

  onScroll () {
    console.log('scroll')
  }

}

export default Gate