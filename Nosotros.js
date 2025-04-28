const canvas = document.querySelector('.fireworks');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let particles = [];
let fireworkInterval = null;

function createFirework(x, y) {
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: x,
      y: y,
      radius: 2 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 6,
      dy: (Math.random() - 0.5) * 6,
      alpha: 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    p.alpha -= 0.0002;

    if (p.alpha <= 0) particles.splice(i, 1);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  requestAnimationFrame(animate);
}
animate();

const video = document.querySelector('.video-vid video');

video.addEventListener('mouseenter', () => {
  fireworkInterval = setInterval(() => {
    const rect = video.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    createFirework(x, y);
  }, 150); // Cambia la frecuencia aquí
});

video.addEventListener('mouseleave', () => {
  clearInterval(fireworkInterval);
});

//SCROLL
//jQuery(document).ready(function ($) {
  //$(".slider-img").on("click", function () {
    //$(".slider-img").removeClass("active");
    //$(this).addClass("active");
  //});
//});

jQuery(document).ready(function ($) {
  $(".slider-img").on("click", function () {
    // Primero, eliminamos la clase 'active' de todas las imágenes
    $(".slider-img").removeClass("active");

    // Luego, agregamos la clase 'active' a la imagen clickeada
    $(this).addClass("active");
  });
});

//spor
// Obtener el reproductor y los controles personalizados
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");
const volumeBtn = document.getElementById("volumeBtn");

// Reproducir o pausar el audio al hacer clic en el botón
playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// Actualizar la barra de progreso mientras se reproduce el audio
audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
});

// Permitir que la barra de progreso se mueva al hacer clic en ella
progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

// Cambiar el volumen del reproductor
volumeBar.addEventListener("input", () => {
  audioPlayer.volume = volumeBar.value / 100;
});

// Alternar el estado de volumen (mute/no mute)
volumeBtn.addEventListener("click", () => {
  if (audioPlayer.muted) {
    audioPlayer.muted = false;
    volumeBtn.textContent = "🔊";
  } else {
    audioPlayer.muted = true;
    volumeBtn.textContent = "🔇";
  }
});
