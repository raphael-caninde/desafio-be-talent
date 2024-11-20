export const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erro ao carregar os dados');
  }
  const data = await response.json();

  return data;
};
