import { useRef, useState } from 'react';
import MaskedInput from 'react-text-mask';
import clsx from 'clsx';
import axios from 'axios';
import { UseForm } from './hooks/useForm';
import { FormSchemaDto, ResponseDto } from "./types/types"; 
import { ResponseStatus } from './enums/response-dto.enum';
 
export const Form = () => {
    const [blockSubmit, setBlockSubmit] = useState(false);
    const [isSending, setInSending] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const send = async () => {
        if (hasErrors) {
            return;
        }

        setInSending(true);
        setBlockSubmit(true);
        const url = "https://cptshell-weather-app.herokuapp.com/form";
        const response = await axios.get<ResponseDto>(url);
        const { status, message } = response.data;
        
        if (status === ResponseStatus.ERROR) {
            alert(`Ой! ${message}`);
        } else {
            alert(`Ура! ${message}`);
            resetData();
            formRef.current?.reset();
        }

        setInSending(false);
        setBlockSubmit(false);
    }

    const { handleSubmit, handleChange, resetData, errors } = UseForm<FormSchemaDto>({
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
        onSubmit: send,
    });

    const today = new Date().toISOString().split('T')[0];
    const hasErrors = Object.keys(errors).length !== 0;

    if (!blockSubmit && hasErrors) {
        setBlockSubmit(true);
    }

    if (!hasErrors && blockSubmit && !isSending) {
        setBlockSubmit(false);
    }

    return (
        <form className="form" ref={formRef} onSubmit={(e) => handleSubmit(e)}>
            <label className="label">
                <span className="name">Имя Фамилия</span>
                <input disabled={isSending} className="input uppercase" onChange={handleChange('name')} type={"text"} />
                <span className="error">{errors.name || ""}</span>
            </label>
            <label className="label">
                <span className="name">E-mail</span>
                <input disabled={isSending} className="input" onChange={handleChange('mail')} type={"email"} required={false}/>
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
                        disabled={isSending}
                    />
                </div>
                <span className="error">{errors.phone || ""}</span>
            </label>
            <label className="label">
                <span className="name">Дата рождения</span>
                <input disabled={isSending} className="input" onChange={handleChange("birthdate")} type={"date"} max={today}/>
                <span className="error">{errors.birthdate || ""}</span>
            </label>
            <label className="label">
                <span className="name">Сообщение</span>
                <textarea disabled={isSending} className="textarea" wrap="hard" onChange={handleChange("message")} cols={21}/>
                <span className="error">{errors.message || ""}</span>
            </label>
            
            <button className={clsx("submit-button", {
                "disabled": blockSubmit
            })} type="submit" disabled={blockSubmit}>Отправить</button>
        </form>
    )
}