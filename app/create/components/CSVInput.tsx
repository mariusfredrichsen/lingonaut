import { useEffect, useState } from "react";





const CSVInput = () => {

    const [terms, setTerms] = useState<string[]>([]);
    const [definitions, setDefinitions] = useState<string[]>([]);
    const [textInput, setTextInput] = useState("");

    useEffect(() => {
        const termDefinitionPair = textInput.split("\n")
        const newTerms: string[] = []
        const newDefinitions: string[] = []

        termDefinitionPair.forEach((pair) => {
            const [term, definition] = pair.split(";");
            if (!definition) return;
            newTerms.push(term)
            newDefinitions.push(definition)
        })
        console.log(termDefinitionPair)
        setTerms(newTerms)
        setDefinitions(newDefinitions)
    }, [textInput])

    return (
        <div>
            <textarea
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
            >
            </textarea>
            <select>
                <option value=";">;</option>
                <option value=",">,</option>
            </select>
            <div className="flex justify-between flex-row">
                <div className="flex flex-col w-full">
                    {terms.map((term, idx) => {
                        return (
                            <div className="flex justify-between w-full">
                                <span key={idx}>{term}</span>
                                <span>-</span>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col w-full text-right">
                    {definitions.map((definition, idx) => {
                        return (
                            <span key={idx}>{definition}</span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CSVInput;