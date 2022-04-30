let examplesList: IExample[] = [
    {
        text: "Computer Sciences Corp . , El Segundo , Calif . , said it is close to making final an agreement to buy Cleveland Consulting Associates from Saatchi & Saatchi",
    },
    {
        text: "Imo Industries Inc . -- $ 150 million of senior subordinated debentures due 2001 , priced at par to yield 12 % . ",
    },
    {
        text: "Gill & Duffus Ltd. , a British cocoa - trading house , estimated that the 1989 - 90 world cocoa surplus would be 231,000 tons , down from 314,000 tons for the previous year .",
    },
    {
        text: "Amtech , which also provides technical temporary employment services to aerospace , defense , computer and high - tech companies in the Southwest and Baltimore - Washington areas , said its final audited results are due in late November .",
    },
    {
        text: "Following the impeachment conviction , Dr. Benjamin Hooks , executive director of the National Association for the Advancement of Colored People , issued a restrained statement , warning that the Hastings case could set a \" dangerous precedent , \" but adding , \" We must respect the considered judgment of the Senate . \"",
    }
]

export interface IExample {
    text: string,
    target?: boolean
}

export default examplesList.map((example, num) => {
    example.target = num === 0
    return example
})
