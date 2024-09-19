import React, { useState, useEffect } from 'react';
import { Usuario } from '../types/Usuario';

interface UsuarioFormProps {
    usuario?: Usuario | null;  // Cuando el prop sea null, quiere decir que será edicion
    onSubmit: (data: { nombre: string; apellido: string; email: string }) => void;
}

export const UsuarioForm: React.FC<UsuarioFormProps> = ({ usuario, onSubmit }) => {
    const [nombre, setNombre] = useState(usuario?.nombre || '');
    const [apellido, setApellido] = useState(usuario?.apellido || '');
    const [email, setEmail] = useState(usuario?.email || '');
    // fetch -> rest
    // axios -> graph, rest, xml, soap

    useEffect(() => {
        if (usuario) {
            setNombre(usuario.nombre);
            setApellido(usuario.apellido);
            setEmail(usuario.email);
        }
    }, [usuario]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Que los botones de tipo submit no recarguen la página
        //e.currentTarget.elements // {"name":"Juan"}
        onSubmit({ nombre, apellido, email });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-2">
            <p>{usuario ? 'Edita el actual usuario' : 'Agregar un nuevo usuario'}</p>
            <div>
                <label className="block text-sm font-medium text-white">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#000000] focus:border-[#000000] sm:text-sm"
                    placeholder="Ingresa tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    />
            </div>

            <div>
                <label className="block text-sm font-medium text-white">Apellido</label>
                <input
                    type="text"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#000000] focus:border-[#000000] sm:text-sm"
                    placeholder="Ingresa tu apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    />
            </div>

            <div>
                <label className="block text-sm font-medium text-white">Email</label>
                <input
                    type="email"
                    placeholder="Ingresa tu email"
                    className="text-black mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#000000] focus:border-[#000000] sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="bg-transparent hover:bg-[#555555] border text-white px-4 py-2 rounded text-sm"
            >
                {usuario ? 'Guardar Cambios' : 'Agregar Usuario'}
            </button>
        </form>
    );
};
