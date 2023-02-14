import { SyntheticEvent, useState } from "react";

interface IUseInput {
  [name: string]: string
}

function useInput(inputs: IUseInput) {
    const [values, setValue] = useState(inputs)

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        setValue({...values, [name]: value})
    }
    return {values, changeInput, setValue}
}

export default useInput;
