import {useCallback, useEffect, useState} from "react";

export type TagType = {
    tag: string,
    description: string,
    color: string
}

export const useTags = () => {
    const [list, setList] = useState<Array<TagType> | null>(null)
    const set = useCallback((tags: TagType[]) => {
        setList(tags)
    }, [])

    /*useEffect(() => {
        if (list){
            console.log("seted ", list)
        } else console.log("seted 0")

    }, [list])*/
    // @ts-ignore
    const getTag = (tag: string): TagType => {
        if (list) return list.filter(description => description.tag === tag.split("-")[1])[0]
    }
    return {list, set, getTag}
}
