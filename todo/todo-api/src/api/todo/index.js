import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Todo, { schema } from './model'

const router = new Router()
const { task } = schema.tree

/**
 * @api {post} /todos Create todo
 * @apiName CreateTodo
 * @apiGroup Todo
 * @apiParam task Todo's task.
 * @apiSuccess {Object} todo Todo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todo not found.
 */
router.post('/',
  body({ task }),
  create)

/**
 * @api {get} /todos Retrieve todos
 * @apiName RetrieveTodos
 * @apiGroup Todo
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of todos.
 * @apiSuccess {Object[]} rows List of todos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /todos/:id Retrieve todo
 * @apiName RetrieveTodo
 * @apiGroup Todo
 * @apiSuccess {Object} todo Todo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todo not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /todos/:id Update todo
 * @apiName UpdateTodo
 * @apiGroup Todo
 * @apiParam task Todo's task.
 * @apiSuccess {Object} todo Todo's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Todo not found.
 */
router.put('/:id',
  body({ task }),
  update)

/**
 * @api {delete} /todos/:id Delete todo
 * @apiName DeleteTodo
 * @apiGroup Todo
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Todo not found.
 */
router.delete('/:id',
  destroy)

export default router
