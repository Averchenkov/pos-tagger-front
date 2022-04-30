import React, {useCallback, useContext, useEffect, useState} from 'react';
import examplesList, {IExample} from "../example";
import {useHttp} from "../hooks/http.hooks";
import {Answer, PredictionType} from "../components/Answer";
import {Loader} from "../components/Loader";
import {Context} from "../context/Context";
import useDocumentTitle from "../hooks/title.hooks";


const FirstPage: React.FC = () => {
    const [examples, setExamples] = useState<IExample[]>(examplesList)
    const [text, setText] = useState<string>(examples.find(example => example.target)?.text || "")
    const [predictions, setPredictions] = useState<Array<Array<PredictionType>>>([])
    const {loading, request} = useHttp()
    const tags = useContext(Context)
    useDocumentTitle("Named Entity Recognition")

    const exampleClick = (text: string) => {
        setExamples(examples.map(example => {
            example.target = example.text == text
            return example
        }))
        setText(examples.find(example => example.target)?.text || "")
    }
    const clearTarget = () => {
        setExamples(examples.map(example => {
            example.target = false
            return example
        }))
    }

    const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
        clearTarget()
    }
    const delITag = (prediction: PredictionType[]): Array<PredictionType> => {
        const elems: PredictionType[] = []
        for (const predictionElement of prediction) {
            if (predictionElement.Tag === "O" || predictionElement.Tag.startsWith("B")) elems.push(predictionElement)
            if (predictionElement.Tag.startsWith("I")){
                // @ts-ignore
                let del: PredictionType = elems.pop()
                elems.push({Token: del.Token + " " + predictionElement.Token, Tag: del.Tag})
            }
        }
        return elems
    }


    useEffect(() => {
        (async () => {
            try {
                const fetched = await request("https://ner-roberta-uca55u3kfq-ew.a.run.app/ner_description", "GET")
                tags.set(fetched.description)
            } catch (e) {}
        })()
    }, [])

    const send = useCallback(async () =>{
        try {
            const fetched = await request("https://ner-roberta-uca55u3kfq-ew.a.run.app/prediction", "POST", {text: text})
            console.log(text, fetched.prediction)
            setPredictions(prev => [fetched.prediction, ...prev])
        } catch (e) {}
    }, [text])

    return (
        <>
            {loading && <Loader/>}
            <p className="title">Name Entity Recognition</p>
            <p>Named Entity Recognition (NER) classifies tokens in text into predefined
                categories (tags), such as person names, quantity expressions, percentage expressions,
                names of locations, organizations, as well as expression of time, currency and others.
                NER can be used as a knowledge extractor when you are interested
                in a piece of certain information in your text.</p>
            <div className="classes">
                Hover on an entity to see its class description <br/> Classes:
                {tags.list && tags.list.map((description, num) => {
                    if (description.color)
                    return (
                        <span className="card" style={{backgroundColor: description.color}} key={num}>
                            {description.tag.toUpperCase()}
                            <div className="tooltip">
                                <div className="tooltipInner" style={{backgroundColor: description.color}}>{description.description}</div>
                            </div>
                        </span>
                    )
                })}
            </div>
            <div className="inputArea">
                <form className="inputs">
                    <div>
                        <p>Text</p>
                        <textarea placeholder="Text" onChange={changeText} value={text}></textarea>
                    </div>
                    <button
                        type="button"
                        onClick={send}
                    >Send</button>
                </form>
                <div className="examples">
                    <p>Examples</p>
                    {examples.map((example, num) => {
                        return <button
                            key={num}
                            type="button"
                            className={example.target ? "active" : undefined}
                            onClick={() => exampleClick(example.text)}
                        >
                            {example.text}
                        </button>
                    })}
                </div>
            </div>
            {predictions.length > 0 &&
            <div className="answers">
                <p>Results</p>
                {predictions.map((prediction, num) => {
                    return <Answer predictions={delITag(prediction)} key={num}/>
                })}
            </div>}
        </>
    )
}

export default FirstPage
