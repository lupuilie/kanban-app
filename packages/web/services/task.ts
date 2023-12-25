const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTaskById = async (id: string) => {
  await delay(2000);

  const data = { id, name: `Task ${id} ${Math.random().toFixed(3)}` };

  console.log('fetchTaskById', { id, data });

  return { data };
};

export const updateTask = async (id: string, name: string) => {
  await delay(2000);

  const data = { id, name };

  console.log('updateTask', { id, data });

  return { data };
};
