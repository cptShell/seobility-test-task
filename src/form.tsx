import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { FormSchema } from "./validation-schemas/form.validation-schema";
import { FormSchemaDto, InputProps } from "./types/types"; 
import { PhoneInput } from './components/phone-input';

 
export const Form = () => {
    const { register, handleSubmit, formState, control } = useForm<FormSchemaDto>({
        resolver: joiResolver(FormSchema),
    });
    const { errors } = formState;

    const onSubmit = (data: FormSchemaDto) => {
        console.log(data);
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label className="label">
                <span className="name">Имя Фамилия</span>
                <input className="input" {...register("name")} type={"text"} />
                <span className="error">{errors.name?.message || ""}</span>
            </label>
            <label className="label">
                <span className="name">E-mail</span>
                <input className="input" {...register("mail")} type={"email"} />
                <span className="error">{errors.mail?.message || ""}</span>
            </label>
            <label className="label">
                <span className="name">Номер телефона</span>
                <div className="input-wrapper">
                    <span className="prefix">+7</span>
                    <PhoneInput control={control} name={"phone"} />
                </div>
                <span className="error">{errors.phone?.message || ""}</span>
            </label>
            <label className="label">
                <span className="name">Дата рождения</span>
                <input className="input" {...register("birthdate")} type={"date"} />
                <span className="error">{errors.birthdate?.message || ""}</span>
            </label>
            <label className="label">
                <span className="name">Сообщение</span>
                <textarea className="textarea" {...register("message")} />
                <span className="error">{errors.message?.message || ""}</span>
            </label>
            
            <button className="submit-button" type="submit">Отправить</button>
        </form>
    )
}