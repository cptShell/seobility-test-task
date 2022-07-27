import { FC } from 'react';
import MaskedInput from 'react-text-mask';
import { useController, UseControllerProps } from 'react-hook-form';
import { FormSchemaDto } from '../types/types';

export const PhoneInput: FC<UseControllerProps<FormSchemaDto>> = (props) => {
    const { field } = useController(props);
    
    return <MaskedInput 
        className="label-input bordered"
        {...field} 
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]} 
        placeholder="(***) *** ** **"
        showMask
        guide={false} 
    />;
};