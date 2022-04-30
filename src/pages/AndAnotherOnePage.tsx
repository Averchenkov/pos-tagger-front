import React, {useCallback, useState} from 'react';
import examplesList, {IExample} from "../example";


const FirstPage: React.FC = () => {
    const [examples, setExamples] = useState<IExample[]>(examplesList)
    const [question, setQuestion] = useState<string>(examples.find(example => example.target)?.text || "")

    const exampleClick = (newExample: IExample) => {
        setExamples(examples.map(example => {
            example.target = example.text == newExample.text
            return example
        }))
        setQuestion(examples.find(example => example.target)?.text || "")
    }
    const clearTarget = () => {
        setExamples(examples.map(example => {
            example.target = false
            return example
        }))
    }

    const changeQuestion = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value)
        clearTarget()
    }

    const ask = useCallback(async () =>{
        const test = ["One",
            "WorD",
            "per",
            "tokens",
            "other",
            "words",
            "better",
            "got"]
        /*text.match(/\w+|\s+|[^\s\w]+/g)*/
        /*try {
            const fetched = await request("https://pos-tag-service-dot-nlp-masters-project.lm.r.appspot.com/pos_list", "POST", body)
            console.log(JSON.stringify(body))
            console.log(fetched)
        } catch (e) {}*/
    }, [])

    return (
        <>
            <p className="title">Name Entity Recognition</p>
            <p>Named Entity Recognition (NER) classifies tokens in text into predefined
                categories (tags), such as person names, quantity expressions, percentage expressions,
                names of locations, organizations, as well as expression of time, currency and others.
                NER can be used as a knowledge extractor when you are interested
                in a piece of certain information in your text.</p>
            <div className="inputArea">
                <form className="inputs">
                    <div>
                        <p>Text</p>
                        <textarea placeholder="Question" onChange={changeQuestion} value={question}></textarea>
                    </div>
                    {/*<div>
                        <p>Введите вопрос</p>
                        <input placeholder="Введите вопрос"onChange={changeQuestion} value={question}/>
                    </div>*/}
                    <button
                        type="button"
                        onClick={ask}
                    >Send</button>
                </form>
                <div className="examples">
                    <p>Examples</p>
                    {examples.map(example => {
                        return <button
                            type="button"
                            className={example.target? "active" : undefined}
                            onClick={() => exampleClick(example)}
                        >
                            {example.text}
                        </button>
                    })}
                </div>
            </div>
        </>
    )
}

export default FirstPage
