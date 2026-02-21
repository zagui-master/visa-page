
const form = document.getElementById('contacto');
const mensaje = document.getElementById('mensaje-envio');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  mensaje.style.color = "#000";
  mensaje.textContent = "Enviando… ⏳";

  const formData = new FormData(form);

  fetch('https://formspree.io/f/xaqdperd', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(async response => {
    let data;
    try {
      data = await response.json();
    } catch (err) {
      data = {};
    }

    if (response.ok) {
      mensaje.style.color = "green";
      mensaje.textContent = "Formulario enviado correctamente 👍";
      form.reset();
    } else {
      mensaje.style.color = "red";
      mensaje.textContent = "Error: " + (data.error || "Intenta de nuevo 😢");
    }
  })
  .catch(() => {
    mensaje.style.color = "red";
    mensaje.textContent = "Error de conexión 😢";
  });
});
