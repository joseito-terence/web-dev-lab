import ax from 'axios';

const axios = ax.create({
  baseURL: 'https://web-dev-lab-assignment-5.onrender.com',
});

export type ResponseType<T> = {
  rows: T[],
  count: number
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export interface TodoType {
  id: string,
  task: string,
  status: 'active' | 'completed'
}

export const todoService = {
  create: async (task: string) => {
    const { data } = await axios.post('/todos', { task });
    return data as TodoType;
  },

  getAll: async () => {
    const { data } = await axios.get('/todos');
    return data as ResponseType<TodoType>;
  },

  get: async (id: string) => {
    const { data } = await axios.get(`/todos/${id}`);
    return data as TodoType;
  },

  update: async (todo: WithRequired<Partial<TodoType>, 'id'>) => {
    const { data } = await axios.put(`/todos/${todo.id}`, todo);
    return data as TodoType;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`/todos/${id}`);
    return data;
  }
}
