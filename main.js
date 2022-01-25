function preload() {
    classifier = ml5.imageClassifier('DoodleNet')
}

function setup() {
    canvas = createCanvas(550, 350)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas)
    synth = window.speechSynthesis
}

function draw() {
    strokeWeight(10)
    stroke(0)
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }

}

function clearCanvas() {
    background("white")
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("label").innerHTML = "label: " + results[0].label
        accuracy = Math.round(results[0].confidence * 100)
        document.getElementById("confidence").innerHTML = "condfidence: " + accuracy + "%"
        utterthis = new SpeechSynthesisUtterance(results[0].label)
        synth.speak(utterthis)

    }
}