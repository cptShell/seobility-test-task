import { ResponseStatus } from '../enums/response-dto.enum';

export type ResponseDto = {
    status: ResponseStatus;
    message: string;
}