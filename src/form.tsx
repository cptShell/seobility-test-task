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
                <span className="label-title">Имя Фамилия</span>
                <input className="label-input" {...register("name")} type={"text"} />
                {errors.name && <span className="label-error">{errors.name.message}</span>}
            </label>
            <label className="label">
                <span className="label-title">E-mail</span>
                <input className="label-input" {...register("mail")} type={"email"} />
                {errors.mail && <span className="label-error">{errors.mail.message}</span>}
            </label>
            <label className="label">
                <span className="label-title">Номер телефона</span>
                <span className="label-prefix">+7</span>
                <PhoneInput control={control} name={"phone"} />
                {errors.phone && <span className="label-error">{errors.phone.message}</span>}
            </label>
            <label className="label">
                <span className="label-title">Дата рождения</span>
                <input className="label-input" {...register("birthdate")} type={"date"} />
                {errors.birthdate && <span className="label-error">{errors.birthdate.message}</span>}
            </label>
            <label className="label">
                <span className="label-title">Сообщение</span>
                <textarea className="label-textarea" {...register("message")} />
                {errors.message && <span className="label-error">{errors.message.message}</span>}
            </label>
            
            <button type="submit">Отправить</button>
        </form>
    )
}