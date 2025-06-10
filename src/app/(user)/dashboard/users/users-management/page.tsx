import ReturnLink from "@ui/Return";

export default function UsersManagementPage() {
  return (
    <>
      <ReturnLink
        href="/dashboard/users"
        text="← Volver a Gestionar Usuarios"
      />

      <h1>Elija una opción</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl p-8 text-center cursor-pointer shadow-md hover:shadow-xl transition transform hover:-translate-y-2 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 group">
          <div className="text-6xl mb-4">➕</div>
          <h3 className="text-2xl mb-2 text-slate-800 group-hover:text-black">
            Crear Editor
          </h3>
          <p className="text-gray-500 italic group-hover:text-black-100">
            Añadir nuevo editor al sistema
          </p>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
            Crear Nuevo
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 text-center cursor-pointer shadow-md hover:shadow-xl transition transform hover:-translate-y-2 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 group">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-2xl mb-2 text-slate-800 group-hover:text-black">
            Gestionar Editores
          </h3>
          <p className="text-gray-500 italic group-hover:text-black-100">
            Editar o eliminar editores existentes
          </p>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
            Ver Listado
          </button>
        </div>
      </div>
    </>
  );
}
