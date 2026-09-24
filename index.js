console.log("log")

// create 16 x 16 grid of square divs

// let's have a proper page and canvas and tools part

let currentTool = "brush"
let isDrawing = false
let cells = []
let isDraggingSlider = false
let brushSize = 1
const minSize = 1
const maxSize = 10
let canvasSize = 16


const page = document.createElement("div")
page.style.width = "100%"
page.id = "page"
page.style.display = "flex"
page.style.flexDirection = "row"
page.style.alignContent = "center"
page.style.alignItems = "center"
page.style.gap = ""
document.body.appendChild(page)

const toolbox = document.createElement("div")
toolbox.id = "toolbox"
toolbox.class = "toolbox"
toolbox.style.display = "flex"
toolbox.style.flexDirection = "column"
toolbox.style.width = "100px"
toolbox.style.gap = "8px"
toolbox.style.padding = "8px"
toolbox.style.justifyContent = "center"
toolbox.style.flexShrink = "0"
toolbox.style.alignSelf = "flex-start"
page.appendChild(toolbox)

const canvasContainer = document.createElement("div")
canvasContainer.style.width = "auto"
canvasContainer.id = "canvas-container"
canvasContainer.display = "flex"
canvasContainer.style.height = "auto"

page.appendChild(canvasContainer)

const container = document.createElement("div")
container.id = "container"
container.style.display = "inline-flex"
container.style.flexWrap = "wrap"
container.style.height = "auto"
container.style.minHeight = "720px"
container.style.maxWidth = "720px"
container.style.width = "auto"
container.style.minWidth = "100px"
container.style.background = "#f1f1f9"
container.style.flexFlow = "row wrap"
container.style.border = "1px solid black"

canvasContainer.appendChild(container)

function createCanvas(i, j){

    cells = []
    
    for(let x = 0; x < i; x++){
        for(let y = 0; y < j; y++){
            const cell = document.createElement("div")
            cell.style.width = 720 / i + "px"
            cell.style.height = 720 / j + "px"
            cell.className = "cell"
            cell.x = x
            cell.y = y
            cells.push(cell)
            container.appendChild(cell)
        }
    }

container.addEventListener("click", (e) => {
    if(isDraggingSlider) return

    applyBrush(e.target.x, e.target.y, currentTool, brushSize)
})

container.addEventListener("mousedown", (e) => {
    isDrawing = true

    applyBrush(e.target.x, e.target.y, currentTool, brushSize)
})

container.addEventListener("mouseup", (e) => {
    isDrawing = false
})

container.addEventListener("mouseover", (e) => {
    if(isDraggingSlider) return
    if(isDrawing){
        applyBrush(e.target.x, e.target.y, currentTool, brushSize)
    }
})

}

createCanvas(16, 16)



const eraser = document.createElement("button")
eraser.textContent = "eraser"
eraser.style.borderRadius = "6px"
toolbox.appendChild(eraser)

eraser.addEventListener("click", () => {
    currentTool = "eraser"
    toolUseUI()
})

const brush = document.createElement("button")
brush.textContent = "brush"
toolbox.appendChild(brush)

brush.addEventListener("click", () => {
    currentTool = "brush"
    toolUseUI()
})

function toolUseUI(){
    if(currentTool === "brush"){
        brush.style.background = "#f3f5b1"
        eraser.style.background = "white"
        randomBtn.style.background = "white"
    } else if(currentTool === "eraser"){
        eraser.style.background = "#f3f5b1"
        brush.style.background = "white"
        randomBtn.style.background = "white"
    } else if (currentTool === "random") {
        eraser.style.background = "white"
        brush.style.background = "white"
        randomBtn.style.background = "#f3f5b1"
    } else {
        console.log("error tootUseUI")
    }
}

const randomBtn = document.createElement("button")
randomBtn.id = "randomize-btn"
randomBtn.textContent = "randomise"
toolbox.appendChild(randomBtn)

randomBtn.addEventListener("click", () => {
    currentTool = "random"
    toolUseUI()
})

toolUseUI()

const darkenBtn = document.createElement("button")
darkenBtn.id = "darken-btn"
darkenBtn.textContent = "darken"
darkenBtn.style.background = "white"
toolbox.appendChild(darkenBtn)


darkenBtn.addEventListener("click", (e) => {
    cells.forEach(cell => {
       let currentOpacity = cell.style.opacity ? cell.style.opacity : "1"
        if(currentOpacity < 1){
            cell.style.opacity = currentOpacity * 1.0 + 0.1 + ""
        } else {
            console.log("darkened fully")
        }
        

    })

})

const lightenBtn = document.createElement("button")
lightenBtn.id = "lighten-btn"
lightenBtn.textContent = "lighten"
lightenBtn.style.background = "white"
toolbox.appendChild(lightenBtn)

lightenBtn.addEventListener("click", (e) => {
    cells.forEach(cell => {
        let currentOpacity = cell.style.opacity ? cell.style.opacity : "1"
        if(currentOpacity > 0.1){
            cell.style.opacity = currentOpacity * 1.0 - 0.1 + ""
        }
        if(currentOpacity === 0.1){
            cell.style.opacity = 0.1
        } else {
            console.log("lightened fully")
        }
        


    })
})


const changeCanvasSizeBtn = document.createElement("button")
changeCanvasSizeBtn.textContent = "canvas size"
changeCanvasSizeBtn.id = "change-canvas-size-btn"
changeCanvasSizeBtn.style.background = "white"
toolbox.appendChild(changeCanvasSizeBtn)

changeCanvasSizeBtn.addEventListener("click", () => {
    let size = prompt("Set canvas size(between 16-100): ", 16)

    size = size * 1.0
    console.log(typeof size)
    container.replaceChildren()
    if(size > 100){
        size = 100
    } else if (size < 1) {
        size = 16
    } else if (typeof size !== "number" || isNaN(size)){
        size = 16 * 1.0
    }
    createCanvas(size, size)
    canvasSize = size
})

function getRandomizedRGB(){
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)

    return `rgb(${r}, ${g}, ${b})`
}

const brushSizeBtn = document.createElement("button")
brushSizeBtn.id = "brush-size-btn"
brushSizeBtn.textContent = "brush size"
brushSizeBtn.style.background = "white"
toolbox.appendChild(brushSizeBtn)

brushSizeBtn.addEventListener("click", (e) => {
    brushSize = prompt("set brush size(1-10): ", "1")
    brushSize = brushSize * 1.0
    if(typeof brushSize !== "number" || isNaN(brushSize)){
        brushSize = 1
    }
})

function applyBrush(centerX, centerY, currentTool, brushSize) {
    const defaultBg = "rgb(241, 241, 249)"

    const paintSingleCell = (x, y, strokeOpacity) => {
        const cell = cells.find(c => c.x === x && c.y === y)
        if (!cell) return

        let baseColor = customColor
        if (currentTool === "eraser") {
            cell.style.background = defaultBg
            cell.style.opacity = "1"
            return
        } else if (currentTool === "random") {
            baseColor = getRandomizedRGB()
        } else if (currentTool === "brush") {
            baseColor = customColor
        }

        const isAlreadyPainted = cell.style.background && cell.style.background !== defaultBg
        let finalColor = baseColor
        let finalOpacity = strokeOpacity

        if (isAlreadyPainted) {
            const existingOpacity = parseFloat(cell.style.opacity) || 1.0
            finalOpacity = Math.min(1.0, existingOpacity + strokeOpacity)

            const oldMatch = cell.style.background.match(/\d+/g)
            if (oldMatch) {
                let r = parseInt(oldMatch[0])
                let g = parseInt(oldMatch[1])
                let b = parseInt(oldMatch[2])

                if (currentTool === "brush") {
                    r = Math.max(0, Math.round(r * 0.5))
                    g = Math.max(0, Math.round(g * 0.5))
                    b = Math.max(0, Math.round(b * 0.5))
                } else {
                    const newMatch = finalColor.match(/\d+/g)
                    if (newMatch) {
                        r = Math.round((r + parseInt(newMatch[0])) / 2)
                        g = Math.round((g + parseInt(newMatch[1])) / 2)
                        b = Math.round((b + parseInt(newMatch[2])) / 2)
                    }
                }
                finalColor = `rgb(${r}, ${g}, ${b})`
            }
        }

        cell.style.background = finalColor
        cell.style.opacity = finalOpacity
    }

    if (brushSize === 1) {
        paintSingleCell(centerX, centerY, 1.0)
        return
    }

    if (brushSize === 2) {
        for (let dx = 0; dx < 2; dx++) {
            for (let dy = 0; dy < 2; dy++) {
                paintSingleCell(centerX + dx, centerY + dy, 1.0)
            }
        }
        return
    }

    const radius = brushSize / 2
    const limit = Math.ceil(radius)

    for (let dx = -limit; dx <= limit; dx++) {
        for (let dy = -limit; dy <= limit; dy++) {
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist <= radius) {
                let strokeOpacity = 1.0
                if (dist >= radius - 0.7) {
                    strokeOpacity = 0.4
                }
                paintSingleCell(centerX + dx, centerY + dy, strokeOpacity)
            }
        }
    }
}

let customColor = "rgb(39, 56, 69)"
let currentHue = 210
let currentSat = 0.43 
let currentVal = 0.27 

const colorPickerBtn = document.createElement("button")
colorPickerBtn.id = "color-picker-btn"
colorPickerBtn.textContent = "Color Picker"
colorPickerBtn.style.background = "white"
toolbox.appendChild(colorPickerBtn)

const colorPopup = document.createElement("div")
colorPopup.id = "mac-color-picker"
colorPopup.style.position = "absolute"
colorPopup.style.display = "none"
colorPopup.style.flexDirection = "column"
colorPopup.style.width = "220px"
colorPopup.style.background = "#ffffff"
colorPopup.style.border = "1px solid #ccc"
colorPopup.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)"
colorPopup.style.borderRadius = "8px"
colorPopup.style.padding = "12px"
colorPopup.style.zIndex = "1000"
colorPopup.style.fontFamily = "sans-serif"
colorPopup.style.fontSize = "12px"
document.body.appendChild(colorPopup)

const previewCircle = document.createElement("div")
previewCircle.style.width = "50px"
previewCircle.style.height = "50px"
previewCircle.style.borderRadius = "50%"
previewCircle.style.background = customColor
previewCircle.style.margin = "0 auto 10px auto"
previewCircle.style.border = "1px solid #ddd"
colorPopup.appendChild(previewCircle)

const canvasBox = document.createElement("canvas")
canvasBox.width = 200
canvasBox.height = 120
canvasBox.style.width = "100%"
canvasBox.style.height = "120px"
canvasBox.style.borderRadius = "4px"
canvasBox.style.cursor = "crosshair"
canvasBox.style.border = "1px solid #ccc"
colorPopup.appendChild(canvasBox)
const ctx2d = canvasBox.getContext("2d")

const controlsRow = document.createElement("div")
controlsRow.style.display = "flex"
controlsRow.style.alignItems = "center"
controlsRow.style.gap = "8px"
controlsRow.style.margin = "10px 0"
colorPopup.appendChild(controlsRow)

const smallSwatch = document.createElement("div")
smallSwatch.style.width = "24px"
smallSwatch.style.height = "24px"
smallSwatch.style.borderRadius = "50%"
smallSwatch.style.background = customColor
smallSwatch.style.border = "1px solid #ccc"
controlsRow.appendChild(smallSwatch)

const hueSlider = document.createElement("input")
hueSlider.type = "range"
hueSlider.min = "0"
hueSlider.max = "360"
hueSlider.value = currentHue
hueSlider.style.flex = "1"
hueSlider.style.accentColor = "#007aff"
controlsRow.appendChild(hueSlider)

const rgbContainer = document.createElement("div")
rgbContainer.style.display = "flex"
rgbContainer.style.justifyContent = "space-between"
rgbContainer.style.gap = "6px"
colorPopup.appendChild(rgbContainer)

function createRgbInput(label) {
    const wrapper = document.createElement("div")
    wrapper.style.display = "flex"
    wrapper.style.flexDirection = "column"
    wrapper.style.alignItems = "center"
    wrapper.style.flex = "1"

    const input = document.createElement("input")
    input.type = "number"
    input.min = "0"
    input.max = "255"
    input.style.width = "100%"
    input.style.textAlign = "center"
    input.style.border = "1px solid #ccc"
    input.style.borderRadius = "3px"
    input.style.padding = "4px 0"

    const lbl = document.createElement("span")
    lbl.textContent = label
    lbl.style.fontSize = "10px"
    lbl.style.color = "#666"
    lbl.style.marginTop = "2px"

    wrapper.appendChild(input)
    wrapper.appendChild(lbl)
    rgbContainer.appendChild(wrapper)
    return input
}

const rInput = createRgbInput("R")
const gInput = createRgbInput("G")
const bInput = createRgbInput("B")

function hsvToRgb(h, s, v) {
    let r, g, b
    let i = Math.floor(h / 60)
    let f = h / 60 - i
    let p = v * (1 - s)
    let q = v * (1 - f * s)
    let t = v * (1 - (1 - f) * s)
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break
        case 1: r = q, g = v, b = p; break
        case 2: r = p, g = v, b = t; break
        case 3: r = p, g = q, b = v; break
        case 4: r = t, g = p, b = v; break
        case 5: r = v, g = p, b = q; break
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function updatePickerDisplay() {
    const width = canvasBox.width
    const height = canvasBox.height
    
    const [baseR, baseG, baseB] = hsvToRgb(currentHue, 1, 1)
    ctx2d.fillStyle = `rgb(${baseR}, ${baseG}, ${baseB})`
    ctx2d.fillRect(0, 0, width, height)

    const gradientWhite = ctx2d.createLinearGradient(0, 0, width, 0)
    gradientWhite.addColorStop(0, "rgba(255,255,255,1)")
    gradientWhite.addColorStop(1, "rgba(255,255,255,0)")
    ctx2d.fillStyle = gradientWhite
    ctx2d.fillRect(0, 0, width, height)

    const gradientBlack = ctx2d.createLinearGradient(0, 0, 0, height)
    gradientBlack.addColorStop(0, "rgba(0,0,0,0)")
    gradientBlack.addColorStop(1, "rgba(0,0,0,1)")
    ctx2d.fillStyle = gradientBlack
    ctx2d.fillRect(0, 0, width, height)

    const [r, g, b] = hsvToRgb(currentHue, currentSat, currentVal)
    customColor = `rgb(${r}, ${g}, ${b})`

    previewCircle.style.background = customColor
    smallSwatch.style.background = customColor
    rInput.value = r
    gInput.value = g
    bInput.value = b
}

colorPickerBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    const rect = colorPickerBtn.getBoundingClientRect()
    colorPopup.style.top = `${rect.bottom + window.scrollY + 6}px`
    colorPopup.style.left = `${rect.left + window.scrollX}px`
    colorPopup.style.display = colorPopup.style.display === "flex" ? "none" : "flex"
    updatePickerDisplay()
    currentTool = "brush"
    toolUseUI()
})

window.addEventListener("click", (e) => {
    if (!colorPopup.contains(e.target) && e.target !== colorPickerBtn) {
        colorPopup.style.display = "none"
    }
})

hueSlider.addEventListener("input", (e) => {
    currentHue = parseFloat(e.target.value)
    updatePickerDisplay()
})

let isPickingCanvas = false
canvasBox.addEventListener("mousedown", (e) => {
    isPickingCanvas = true
    pickColorFromCanvas(e)
})
window.addEventListener("mousemove", (e) => {
    if (isPickingCanvas) pickColorFromCanvas(e)
})
window.addEventListener("mouseup", () => {
    isPickingCanvas = false
})

function pickColorFromCanvas(e) {
    const rect = canvasBox.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top
    x = Math.max(0, Math.min(x, rect.width))
    y = Math.max(0, Math.min(y, rect.height))

    currentSat = x / rect.width
    currentVal = 1 - (y / rect.height)
    updatePickerDisplay()
    currentTool = "brush" 
    toolUseUI()
}

[rInput, gInput, bInput].forEach(input => {
    input.addEventListener("input", () => {
        let r = Math.max(0, Math.min(255, parseInt(rInput.value) || 0))
        let g = Math.max(0, Math.min(255, parseInt(gInput.value) || 0))
        let b = Math.max(0, Math.min(255, parseInt(bInput.value) || 0))
        customColor = `rgb(${r}, ${g}, ${b})`
        previewCircle.style.background = customColor
        smallSwatch.style.background = customColor
        currentTool = "brush" 
        toolUseUI()
    })
})

const childrenS = [...toolbox.children]


childrenS.forEach(child => {
    child.style.borderRadius = "6px"
    child.style.fontSize = "14px"
    child.style.fontWeight = "600"
})