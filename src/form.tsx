import { useEffect, useState } from 'react';
import { UseForm } from './hooks/useForm';
import { FormSchemaDto } from "./types/types"; 
import MaskedInput from 'react-text-mask';
import clsx from 'clsx';


 
export const Form = () => {
    const [blockSubmit, setBlockSubmit] = useState(false);
    const [isValidation, setIsValidation] = useState(false);
    
    const { handleSubmit, handleChange, data, errors, validate } = UseForm<FormSchemaDto>({
        validations: {
            name: {
                required: {
                    value: true,
                    message: "Введите имя и фамилию",
                },
                pattern: {
                    value: /^[A-Za-z]{3,30}\s[A-Za-z]{3,30}$/,
                    message: "Имя или фамилия введены некорректно"
                }
            },
            mail: {
                required: {
                    value: true,
                    message: "Введите электронную почту",
                },
                pattern: {
                    value: /^([a-zA-Z-_]{3,15})@([\w\-]{4,})((\.(\w){2,})+)$/,
                    message: "Электронная почта введена некорректно",
                },
            },
            phone: {
                required: {
                    value: true,
                    message: "Введите номер телефона",
                },
                pattern: {
                    value: /^\([1-9]\d\d\)\s\d\d\d\s\d\d\s\d\d$/,
                    message: "Номер телефона введен некорректно",
                },
            },
            birthdate: {
                required: {
                    value: true,
                    message: "Укажите дату рождения",
                }
            },
            message: {
                required: {
                    value: true,
                    message: "Введите сообщение",
                },
                custom: {
                    isValid: (value) => {
                        if (value) {
                            return value.length >= 3 && value.length <= 100;
                        }
                        return false;
                    },
                    message: "Сообщение должно иметь длину от 3 до 100 символов",
                },
            }
        },
        onSubmit: () => {
            setBlockSubmit(false);
        }
    });

    const hasErrors = Object.keys(errors).length !== 0;
    if (!blockSubmit && hasErrors) {
        setBlockSubmit(true);
    } 

    const send = () => {
        console.log(data);
    }

    return (
        <form className="form" onSubmit={(e) => handleSubmit(e, send)}>
            <label className="label">
                <span className="name">Имя Фамилия</span>
                <input className="input" onChange={handleChange('name')} type={"text"} />
                <span className="error">{errors.name || ""}</span>
            </label>
            <label className="label">
                <span className="name">E-mail</span>
                <input className="input" onChange={handleChange('mail')} type={"email"} required={false}/>
                <span className="error">{errors.mail || ""}</span>
            </label>
            <label className="label">
                <span className="name">Номер телефона</span>
                <div className="input-wrapper">
                    <span className="prefix">+7</span>
                    <MaskedInput 
                        className="input phone"
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]} 
                        placeholder="(***) *** ** **"
                        showMask
                        guide={false}
                        onChange={handleChange("phone")}
                    />
                </div>
                <span className="error">{errors.phone || ""}</span>
            </label>
            <label className="label">
                <span className="name">Дата рождения</span>
                <input className="input" onChange={handleChange("birthdate")} type={"date"} />
                <span className="error">{errors.birthdate || ""}</span>
            </label>
            <label className="label">
                <span className="name">Сообщение</span>
                <input className="textarea" type={"text"} onChange={handleChange("message")}/>
                <span className="error">{errors.message || ""}</span>
            </label>
            
            <button className={clsx("submit-button", {
                "disabled": blockSubmit
            })} type="submit">Отправить</button>
        </form>
    )
}