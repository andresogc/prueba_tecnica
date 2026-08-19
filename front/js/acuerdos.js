document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const roleIdStr = localStorage.getItem('role_id');
    const roleId = parseInt(roleIdStr, 10);
    
    // Rol 1 = Lector, Rol 2 = Editor
    const hasRead = (roleId === 1 || roleId === 2);
    const hasWrite = (roleId === 2);

    if (!hasRead && !hasWrite) {
        alert('No tienes permisos para ver esta página.');
        window.location.href = 'index.html';
        return;
    }

    
    const createCard = document.getElementById('create-acuerdo-card');
    const listCard = document.getElementById('list-acuerdo-card');

    if (hasWrite) {
        createCard.classList.remove('d-none');
    }
    
    if (hasRead || hasWrite) {
        listCard.classList.remove('d-none');
        loadAcuerdos();
    }

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        window.location.href = 'index.html';
    });

    
    document.getElementById('refresh-btn').addEventListener('click', loadAcuerdos);

    // Crear Acuerdo
    if (hasWrite) {
        document.getElementById('create-acuerdo-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const titulo = document.getElementById('titulo').value;
            const descripcion = document.getElementById('descripcion').value;

            try {
                const response = await fetch('http://localhost:3000/api/acuerdos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ titulo, descripcion })
                });

                if (response.ok) {
                    document.getElementById('create-acuerdo-form').reset();
                    loadAcuerdos();
                } else {
                    alert('Error al crear el acuerdo');
                }
            } catch (error) {
                console.error(error);
                alert('Error de conexión al crear');
            }
        });
    }

    // Función para cargar acuerdos
    async function loadAcuerdos() {
        try {
            const response = await fetch('http://localhost:3000/api/acuerdos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const acuerdos = await response.json();
                renderAcuerdos(acuerdos);
            } else {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    window.location.href = 'index.html';
                }
            }
        } catch (error) {
            console.error(error);
            document.getElementById('acuerdos-list').innerHTML = '<div class="text-danger text-center">Error al cargar los datos.</div>';
        }
    }

    
    function renderAcuerdos(acuerdos) {
        const container = document.getElementById('acuerdos-list');
        container.innerHTML = '';

        if (!acuerdos || acuerdos.length === 0) {
            container.innerHTML = '<div class="text-center text-muted py-3">No hay acuerdos creados.</div>';
            return;
        }

        acuerdos.forEach(acuerdo => {
            const item = document.createElement('div');
            item.className = 'acuerdo-item d-flex justify-content-between align-items-center';

            let statusControl = `<span class="badge bg-info text-dark">${acuerdo.estado || 'pendiente'}</span>`;

            
            if (hasWrite) {
                statusControl = `
                    <select class="form-select form-select-sm status-select" style="width: auto;" data-id="${acuerdo.id}">
                        <option value="pendiente" ${acuerdo.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="aprobado" ${acuerdo.estado === 'aprobado' ? 'selected' : ''}>Aprobado</option>
                        <option value="rechazado" ${acuerdo.estado === 'rechazado' ? 'selected' : ''}>Rechazado</option>
                    </select>
                `;
            }

            item.innerHTML = `
                <div>
                    <h6 class="mb-1">${acuerdo.titulo}</h6>
                    <small class="text-muted">${acuerdo.descripcion}</small>
                </div>
                <div>
                    ${statusControl}
                </div>
            `;
            container.appendChild(item);
        });

        
        if (hasWrite) {
            document.querySelectorAll('.status-select').forEach(select => {
                select.addEventListener('change', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    const newState = e.target.value;
                    
                    try {
                        const response = await fetch(`http://localhost:3000/api/acuerdos/${id}/estado`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ estado: newState })
                        });
                        
                        if (!response.ok) {
                            alert('Error al cambiar el estado');
                            loadAcuerdos(); 
                        }
                    } catch (error) {
                        console.error(error);
                        alert('Error de conexión');
                        loadAcuerdos();
                    }
                });
            });
        }
    }
});
