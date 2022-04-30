import {createContext} from 'react'
import {TagType} from "../hooks/tags.hooks";

interface IContext {
    list: TagType[] | null
    set: (tags: TagType[]) => void | null
    getTag: ((tag: string) => TagType) | null
}

function noop() {}

export const Context = createContext<IContext>({
    list: null,
    set: noop,
    getTag: null
})
