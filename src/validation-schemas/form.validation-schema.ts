import Joi from "joi";
import { FormSchemaDto } from "../types/form.type";

export const FormSchema = Joi.object<FormSchemaDto>({
    name: Joi.string().pattern(new RegExp(/^[A-Za-z]{3,30}\s[A-Za-z]{3,30}$/)).required().messages({
        "string.empty": "Введите имя и фамилию",
        "string.pattern.base": "Имя или фамилия введены некорректно",
    }),
    mail: Joi.string().email({tlds: { allow: false }}).required().messages({
        "string.empty": "Введите электронную почту",
        "string.email": "Электронная почта введена некорректно",
    }),
    phone: Joi.string().pattern(new RegExp(/^\([1-9]\d\d\)\s\d\d\d\s\d\d\s\d\d$/)).required().messages({
        "any.required": "Введите номер телефона",
        "string.empty": "Введите номер телефона",
        "string.pattern.base": "Номер телефона введен некорректно",
    }),
    birthdate: Joi.date().less('now').required().messages({
        "date.base": "Введите дату рождения",
        "date.less": "Сначала родитесь"
    }),
    message: Joi.string().min(10).max(300).required().messages({
        "string.min": "Слишком мало символов, допишите еще что нибудь",
        "string.max": "Превышена длина сообщения",
        "string.empty": "Введите сообщение",
    }),
});