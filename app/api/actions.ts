import axios from "axios"
import { ITodo } from "@/app/page"

export const getTodos = async () => {
    const { data } = await axios.get('https://assignment-todolist-api.vercel.app/api/kimmandoo/items?page=1&pageSize=10')

    return data
}

export const getTodoById = async (id : number) => {
    const { data } = await axios.get(`https://assignment-todolist-api.vercel.app/api/kimmandoo/items/${id}`)

    return data
}

export const updateComplete = async ( data : ITodo) => {
    await axios.patch(`https://assignment-todolist-api.vercel.app/api/kimmandoo/items/${data.id}`, {
                name : data.name,
                memo : data.memo || '',
                imageUrl : data.imageUrl || '',
                isCompleted : true
        })
}

export const addTodo = async (name : string) => {
    const { data } = await axios.post('https://assignment-todolist-api.vercel.app/api/kimmandoo/items', {
            name
    })

    return data
}