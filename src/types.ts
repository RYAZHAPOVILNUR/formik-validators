export type FormValue = {
  readonly [key: string]: string
}

export type ValidationErrors = {readonly [key: string]: string | null}

export type Validate = (values: FormValue) => ValidationErrors

export type ValidateFn = (form: FormValue, fieldName: string) => ValidationErrors

export type ValidationSchema = {readonly [key: string]: readonly ValidateFn[]};
