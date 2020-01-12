
export function fieldStatus(form, fieldName) {
  return form.formState.isSubmitted || (form.formState.touched.includes(fieldName) && form.errors[fieldName]) ? 'danger' : ''
}

export function fieldValidationMessage(form, fieldName) {
  return form.formState.isSubmitted || (form.formState.touched.includes(fieldName) && form.errors[fieldName])
    ? (form.errors[fieldName] || {}).message : ''
}
