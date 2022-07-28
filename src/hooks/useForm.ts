import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const UseForm = <T extends Record<keyof T, any> = {}>(options?: {
    validations?: Validations<T>;
    initialValues?: Partial<T>;
    onSubmit?: () => void;
}) => {
    const [data, setData] = useState<T>((options?.initialValues || {}) as T);
    const [errors, setErrors] = useState<ErrorRecord<T>>({});

    const handleChange = <S extends unknown>(
        key: keyof T,
        sanitizeFn?: (value: string) => S
    ) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;

        setData({
            ...data,
            [key]: value,
        });

        if (Object.keys(errors).length !== 0) {
            validate();
        }
    };

    const validate = () => {
        console.log(data);
        const validations = options?.validations;

        if (validations) {
            let valid = true;
            const newErrors: ErrorRecord<T> = {};

            for (const key in validations) {
                const value = data[key];
                
                const validation = validations[key];
                
                const pattern = validation?.pattern;
                if (pattern?.value && !pattern.value.test(value)) {
                    valid = false;
                    newErrors[key] = pattern.message;
                }

                const custom = validation?.custom;
                if (custom?.isValid && !custom.isValid(value)) {
                    valid = false;
                    newErrors[key] = custom.message;
                }

                if (validation?.required?.value && !value) {
                    valid = false;
                    newErrors[key] = validation?.required?.message;
                }
            }

            if (!valid) {
                setErrors(newErrors);

                return;
            }
        }

        setErrors({});

        if (options?.onSubmit) {
            options.onSubmit();
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, actionFn: () => void) => {
        e.preventDefault();

        validate();
        actionFn();
    };

    return {
        data,
        handleChange,
        handleSubmit,
        errors,
        validate,
    };
};