import mongoose, { Schema } from 'mongoose'

const todoSchema = new Schema({
  task: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

todoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      task: this.task,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Todo', todoSchema)

export const schema = model.schema
export default model
