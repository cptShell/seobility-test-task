export type InputProps = {
    label?: string | true,
    defaultValue?: string,
    name?: string,
    type?: string,
    mask?: (value: string) => string,
    placeholder?: string,
    disabled?: boolean,
    error?: any,
    value?: string,
    register?: any,
  }