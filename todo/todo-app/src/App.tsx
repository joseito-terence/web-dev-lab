import { useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button, FormCheck, FormControl, Spinner } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import type { TodoType } from './services'
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from './hooks';

type FilterType = 'all' | TodoType['status']

export default function App() {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const query = useTodos()
  const todos = useMemo(() => query.data?.rows || [], [query])
  const createMutation = useCreateTodo()
  const updateMutation = useUpdateTodo()
  const deleteMutation = useDeleteTodo()

  const [task, setTask] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const activeCount = useMemo(() => todos.filter(todo => todo.status === 'active').length, [todos])

  const clearCompleted = () => {
    Promise.allSettled(todos.map(todo => deleteMutation.mutateAsync(todo.id)))
      .then(() => query.refetch())
  }

  return (
    <div className='w-100'>
      <img className='w-100' src={isMobile ? '/bg-mobile-light.jpg' : '/bg-desktop-light.jpg'} alt='banner' />

      <div
        className='p-2 mx-auto'
        style={{ width: isMobile ? '100%' : 600, marginTop: -116 }}
      >
        <h1 style={{ fontWeight: '800', color: 'white', letterSpacing: 10 }}>TODO</h1>
        <FormControl
          placeholder='Create a new todo...'
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              createMutation.mutate(task)
              setTask('')
            }
          }}
          className='w-100 px-3 py-2 rounded-2 fs-5 position-relative'
        />

        <div className='w-100 bg-white rounded-2 pt-2 mt-3 shadow-lg'>
          {query.isLoading &&
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          }

          {todos
            .filter((todo) => (filter === 'all') ? true : (todo.status === filter))
            .map((todo, idx) => (
              <div
                key={idx}
                className='d-flex justify-content-between align-items-center ps-3 py-1 border-bottom'
              >
                <FormCheck
                  type="checkbox"
                  id={todo.id.toString()}
                  label={todo.task}
                  checked={todo.status === 'completed'}
                  onChange={e => {
                    updateMutation.mutate({ ...todo, status: e.target.checked ? 'completed' : 'active' })
                  }}
                />
                <Button variant='default' onClick={() => deleteMutation.mutate(todo.id)}>
                  <IoMdClose size={24} color="gray" />
                </Button>
              </div>
            ))
          }

          <div className='d-flex align-items-center justify-content-between p-2 ps-3' style={{ fontSize: 14 }}>
            <span style={{ color: 'gray' }}>{activeCount} items left</span>
            {!isMobile &&
              <div>
                <Filters filter={filter} setFilter={setFilter} />
              </div>
            }
            <Button variant='default' size='sm' onClick={clearCompleted} className='text-secondary'>
              Clear Completed
            </Button>
          </div>
        </div>

        {isMobile &&
          <div style={{
            display: 'flex',
            marginTop: 10,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            borderRadius: 4
          }}>
            <Filters filter={filter} setFilter={setFilter} />
          </div>
        }
      </div>
    </div>
  )
}

interface FiltersProps {
  filter: FilterType,
  setFilter: (filter: FilterType) => void
}

const filters: FilterType[] = ['all', 'active', 'completed']

const Filters = ({ filter, setFilter }: FiltersProps) => (
  <>
    {filters.map((option, idx) => (
      <Button
        variant='default'
        onClick={() => setFilter(option)}
        className='px-1'
        key={idx}
        style={{
          color: (filter === option) ? '#484b6a' : '#757575',
          fontWeight: 'bold',
          textTransform: 'capitalize'
        }}
      >
        {option}
      </Button>
    ))}
  </>
)
