import { useState } from 'react'
import { UsuarioForm } from './UsuarioForm'
import { CardModal } from '../../common/CardModal'
import { Usuario } from '../types';

export const UsuariosDashboard = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([
        { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan@example.com' },
        { id: 2, nombre: 'Maria', apellido: 'Gomez', email: 'maria@example.com' },
        { id: 3, nombre: 'Pedro', apellido: 'Garcia', email: 'pedro@example.com' },
        { id: 4, nombre: 'Ana', apellido: 'Lopez', email: 'ana@example.com' },
    ]);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Nuevo estado para distinguir entre agregar/editar

    const abrirModal = (usuario?: Usuario) => {
        setUsuarioSeleccionado(usuario || null);
        setIsEditing(!!usuario); // Si hay usuario, es edición
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setUsuarioSeleccionado(null);
    };

    const handleUsuarioSubmit = (data: { nombre: string; apellido: string; email: string }) => {
        if (isEditing && usuarioSeleccionado) {
            // Editar usuario existente
            setUsuarios((prev) =>
                prev.map((usr) =>
                    usr.id === usuarioSeleccionado.id
                        ? { ...usr, ...data }
                        : usr
                )
            );
        } else {
            // Agregar nuevo usuario
            const nuevoUsuario: Usuario = {
                id: usuarios.length + 1,  // Crear un nuevo ID (esto es solo un ejemplo, debería manejarse en el backend)
                ...data,
            };
            setUsuarios((prev) => [...prev, nuevoUsuario]);
        }
        cerrarModal();
    };

    return (
        <div className="p-8">
            <p className="font-bold mb-6 text-white text-4xl">Usuarios</p>
            <div className="mb-4 flex justify-end">
                <button
                    className="bg-transparent hover:bg-[#555555] border text-white px-4 py-2 rounded text-xl"
                    onClick={() => abrirModal()}
                >
                    Agregar Usuario
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-white bg-[#212121] shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-[#080808] border-b-2 border-[#181818] text-xl">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">Nombre</th>
                            <th className="px-4 py-3 text-left font-semibold">Apellido</th>
                            <th className="px-4 py-3 text-left font-semibold">Email</th>
                            <th className="px-4 py-3 text-left font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id} className="border-b">
                                <td className="px-4 py-3 text-sm">{usuario.nombre}</td>
                                <td className="px-4 py-3 text-sm">{usuario.apellido}</td>
                                <td className="px-4 py-3 text-sm">{usuario.email}</td>
                                <td className="px-4 py-3">
                                    <button
                                        className="bg-trasnparent hover:bg-[#555555] border text-white px-4 py-2 rounded text-sm"
                                        onClick={() => abrirModal(usuario)}
                                    >
                                        Detalle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen &&
                <CardModal onClose={cerrarModal}>
                    <UsuarioForm
                        usuario={usuarioSeleccionado}
                        onSubmit={handleUsuarioSubmit}
                    />
                </CardModal>
            }
        </div>
    );
};
