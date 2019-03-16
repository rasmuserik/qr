;(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  })
  const video = document.getElementById("video")
  video.srcObject = stream
  video.play()

  setInterval(async () => {
    const canvas = document.getElementById("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)

    const code = jsQR(data, canvas.width, canvas.height)
    if (code) {
      document.getElementById("qrdata").innerHTML = code.data.replace(
        /</g,
        "&gt;"
      )
      if (code.data.match(/^https?:[/][/]/)) {
        location.href = code.data
      }
    }
  }, 500)
})()
