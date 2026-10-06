import { useFetch } from '../hooks/useFetch';
import { Navbar } from '../components/Navbar';
import { API_BASE_URL } from '../config/api';

export const HomePage = () => {
  const { data, isLoading, error } = useFetch(`${API_BASE_URL}/articles`);

  return (
    <div>
      <Navbar />
      
      <main className="p-4 max-w-3xl mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-4">Artículos Publicados</h1>

        {isLoading && <p className="text-blue-600">Cargando...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!isLoading && !error && (!data || data.length === 0) && <p>No hay artículos.</p>}

        <div className="flex flex-col gap-4">
          {!isLoading && !error && data?.map((article) => (
            <article key={article.id} className="border p-4">
              <h2 className="font-bold text-xl">{article.title}</h2>
              <p className="mb-2">{article.excerpt}</p>
              <span className="bg-gray-200 text-sm px-2 py-1">
                Autor: {article.author?.alias || 'Anónimo'}
              </span>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};