import {FormValue, ValidateFn, ValidationErrors, ValidationSchema} from './types'

// @ts-ignore
export const curry = (fn, ...par) => {
  // @ts-ignore
  const curried = (...args) => (
    fn.length > args.length
      ? curry(fn.bind(null, ...args))
      : fn(...args)
  )

  return par.length
    ? curried(...par)
    : curried
}

export const getErrors = curry(
  (
    form: FormValue,
    fieldName: string,
    validators: readonly ValidateFn[]
  ): ValidationErrors =>
    validators
      .map(validator => validator(form, fieldName))
      .reduce((prev: ValidationErrors, curr: ValidationErrors) => ({
        ...prev,
        ...curr
      }), {})
)

export const getValidateFunction =
  (validationSchema: ValidationSchema) =>
    (form: FormValue) =>
      Object.fromEntries(
        Object.entries(validationSchema).map(
          ([fieldName, value]) => [
            fieldName,
            getErrors(form, fieldName, value)[fieldName]
          ]
        )
      )


export const hasErrors = (errors: ValidationErrors): boolean =>
  !!Object.entries(errors).filter(([, value]) => !!value).length
