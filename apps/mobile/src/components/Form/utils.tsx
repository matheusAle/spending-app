
export function isInvalid(form, fieldName) {
  const isTouched = form.formState.touched[fieldName];
  const hasError = form.errors[fieldName];
  const isSubmitted = form.formState.isSubmitted;

  return ((isSubmitted || isTouched) && hasError)
}

export function fieldStatus(form, fieldName) {
  return isInvalid(form, fieldName) ? 'danger' : ''
}

export function fieldValidationMessage(form, fieldName) {
  return isInvalid(form, fieldName) ? (form.errors[fieldName] || {}).message : ''
}
