document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-message');
    
    errorMsg.classList.add('d-none');

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            
            localStorage.setItem('token', data.token);
            
            
            const roleId = data.user ? data.user.role_id : null;
            localStorage.setItem('role_id', roleId);

            window.location.href = 'acuerdos.html';
        } else {
            errorMsg.classList.remove('d-none');
            const errData = await response.json();
            if (errData.message) {
                errorMsg.textContent = errData.message;
            }
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        errorMsg.classList.remove('d-none');
        errorMsg.textContent = 'Error de conexión con el servidor.';
    }
});
