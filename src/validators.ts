import {FormValue} from './types'
import {curry} from './utils'

export const required = curry(
(form: FormValue, fieldName: string) =>
  Object.keys(
    min(1, form, fieldName)
  ).length
    ? {[fieldName]: 'Required'}
    : {}
)

export const min = curry(
  (target: number, form: FormValue, fieldName: string) => (form[fieldName] as string)?.length < target
    ? {[fieldName]: `Should be more than ${target - 1} characters`} : {}
)

export const max = curry(
  (target: number, form: FormValue, fieldName: string) => (form[fieldName] as string).length > target
    ? {[fieldName]: `Should be less than ${target} characters`} : {}
)

export const email = curry(
  (form: FormValue, fieldName: string) =>
    !(form[fieldName] as string).match(/\S+@\S+\.\S+/)
      ? {[fieldName]: 'Invalid email'} : {}
)

export const compare = curry(
  (targetFieldName: string, form: FormValue, fieldName: string) =>
    form[fieldName] !== form[targetFieldName]
      ? {[fieldName]: 'Not equal'} : {}
)
