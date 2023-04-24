import { useMutation, useQuery } from "@tanstack/react-query"
import type { TodoType, ResponseType } from './services'
import { todoService } from "./services"
import { queryClient } from "./main"

const getTodosFromCache = () => queryClient.getQueryData<ResponseType<TodoType> | undefined>(['todos'])

const setTodosCache = (_todos: ResponseType<TodoType>) => {
  queryClient.setQueryData<ResponseType<TodoType> | undefined>(['todos'], _todos)
}

export const useTodos = () => {
  return useQuery(['todos'], todoService.getAll)
}

export const useCreateTodo = () => 
  useMutation(todoService.create, {
    onSuccess: () => queryClient.refetchQueries(['todos']),
    onMutate: (_todo: string) => {
      const _todos = getTodosFromCache()
  
      if (_todos) {
        setTodosCache({
          count: _todos.count + 1,
          rows: [..._todos.rows, { id: Date.now().toString(), task: _todo, status: 'active' }]
        })
      }
    }
  })


export const useUpdateTodo = () => 
  useMutation(todoService.update, {
    onSuccess: () => queryClient.refetchQueries(['todos']),
    onMutate: (_todo: TodoType) => {
      const _todos = getTodosFromCache()
  
      if (_todos) {
        setTodosCache({
          ..._todos,
          rows: _todos.rows.map(todo => todo.id === _todo.id ? _todo : todo)
        })
      }
    }
  })


export const useDeleteTodo = () => 
  useMutation(todoService.delete, {
    onMutate: (id) => {
      const _todos = getTodosFromCache()
  
      if (_todos) {
        setTodosCache({
          count: _todos.count - 1,
          rows: _todos.rows.filter(todo => todo.id !== id)
        })
      }
    },
  })

