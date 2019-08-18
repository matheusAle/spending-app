import React from 'react';
import Validator from 'validate.js';
import { isEmpty } from 'lodash';

Validator.validators.email.message = '^Informe um e-mail Valido.';
Validator.validators.presence.message = '^Esse campo não pode ser vazio.';
Validator.validators.length.tooShort = '^Deve ter pelomenos %{count} caracteres.';
Validator.validators.length.tooLong = '^Deve ter no máximo %{count} caracteres.';
Validator.validators.length.wrongLength = '^Tamanho inválido, deve conter exatamente %{count} caracteres.';

export const Validators = {
    email: {
        email: true,
    },
    required: {
        presence: {
            allowEmpty: false,
        },
    },
    minLength(minLength) {
        return {
            length: {
                minimum: minLength
            }
        }
    }
};

export function ValidatorBuilder(fieldsDefs) {

    Object.entries(fieldsDefs).forEach(([field, [value, ...validators]]) => {

        const  fieldValidators = validators.reduce((obj, value) => ({...obj, ...value}), {});

        this[field] = {
            ...fieldValidators,
            $onValidate: []
        };

        this[field].$validate = () => {
            let result = Validator({ [field]: value() }, { [field]: fieldValidators });
            result = result ? result[field] : [];

            this[field].$onValidate.map(v => v(result));

            return result;
        }
    });

    this.validate = () => {
        let results = {};

        Object.keys(fieldsDefs).forEach(fieldKey => {
            let r = this[fieldKey].$validate();
            if (!isEmpty(r)) results[fieldKey] = r;
        });

        return results;
    };

    this.isValid = () => {
        return isEmpty(this.validate());
    };

    return this;
}