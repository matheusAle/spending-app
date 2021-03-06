import React, { useState } from 'react';
import { setLocale } from 'yup';
setLocale({
    mixed: {
        required: 'Por favor, preencha este campo.',
    },
    string: {
        email: 'Por favor, verifique se o e-mail está correto.',
        min: 'Deve ter mais de ${min} caracteres.',
        max: 'Deve ter menos de ${max} caracteres.',
    },
    number: {
        positive: 'Por favor, informe um número positivo',
        negative: 'Por favor, informe um número negativo',
        integer: 'Por favor, informe um número inteiro',
        min: 'Deve ser maior que ${min}',
        max: 'Deve ser menor que ${max}',
    },
});

import * as yup from 'yup';
export const Validator = yup;

export class FormBuilder<F> {
    values: any;
    schema: yup.Schema<any>;

    constructor(fieldsDefs: { [s: string]: [any, yup.Schema<any>] }) {

        const schema = {};
        this.values = {};
        // @ts-ignore
        Object.entries(fieldsDefs).forEach(([field, [value, validator]]) => {
            schema[field] = validator;
            this.values[field] = value;
        });

        this.schema = yup.object().shape(schema);
    }
}
