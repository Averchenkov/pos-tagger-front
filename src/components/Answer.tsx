import React, {useContext} from "react";
import {TagType, useTags} from "../hooks/tags.hooks";
import {Context} from "../context/Context";

export const Answer:React.FC<AnswerProps> = (props) => {
    const {getTag} = useContext(Context)
    // @ts-ignore

    return (
        <div className="answer">
            {props.predictions.map((prediction, num) => {
                if (prediction.Tag === "O") return prediction.Token + " "
                else return (
                    <span className="card" style={{backgroundColor: getTag ? getTag(prediction.Tag).color : "#000"}} key={num}>
                        {prediction.Token}
                        <span className="innerTip">{prediction.Tag.split("-")[1]}</span>
                        <div className="tooltip">
                            <div className="tooltipInner" style={{backgroundColor: getTag ? getTag(prediction.Tag).color : "#000"}}>{getTag ? getTag(prediction.Tag).description : "None"}</div>
                        </div>
                    </span>
                )
            })}
        </div>
    )
}

type AnswerProps = {
    predictions: Array<PredictionType>;
}

export type PredictionType = {
    Token: string,
    Tag: string
}
