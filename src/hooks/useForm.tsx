import { ChangeEventHandler, useState } from "react"

export const useForm = <T,>(init: T) => {
    const [state, setState] = useState(init)

    const changeHandler: ChangeEventHandler<any> = (event) => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })
    }

    const reset = () => setState(init)

    return [state, changeHandler, reset] as const
}