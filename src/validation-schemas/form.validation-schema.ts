import Joi from "joi";
import PhoneNumberExtension from "joi-phone-number";
const customJoi = Joi.extend(PhoneNumberExtension) as typeof Joi;

type FormSchemaDto = {
    name: string,
    mail: string,
    phone: string,
    birthdate: string,
    message: string,
}

const FormSchema = customJoi.object<FormSchemaDto>({
    name: Joi.string().pattern(new RegExp('^[A-Za-z]{3,30}\s[A-Za-z]{3,30}$')).required().messages({
        "string.empty": "Введите имя и фамилию",
        "string.pattern": "Имя или фамилия введены некорректно",
    }),
    mail: Joi.string().email().required().messages({
        "string.empty": "Введите электронную почту",
        "string.email": "Электронная почта введена некорректно",
    }),
    phone: Joi.string().phoneNumber({defaultCountry: 'RUS', format: 'international'}).required().messages({
        "string.empty": "Введите номер телефона",
        "string.phoneNumber": "Номер телефона введен некорректно",
    }),
    birthdate: Joi.date().greater('now').required().messages({
        "date.empty": "Введите дату рождения",
        "date.less": "Сначала родитесь"
    }),
    message: Joi.string().min(10).max(300).required().messages({
        "string.min": "Слишком мало символов, допишите еще что нибудь",
        "string.max": "Превышена длина сообщения",
        "string.empty": "Введите сообщение",
    }),
});