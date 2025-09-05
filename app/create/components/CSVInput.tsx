import { useEffect, useState } from "react";





const CSVInput = () => {

    const [terms, setTerms] = useState<string[]>([]);
    const [definitions, setDefinitions] = useState<string[]>([]);
    const [textInput, setTextInput] = useState("");

    useEffect(() => {
        const termDefinitionPair = textInput.split("\n")
        setTerms(termDefinitionPair.map((pair) => {
            return pair.split(";")[0]
        }))

        setDefinitions(termDefinitionPair.map((pair) => {
            return pair.split(";")[1]
        }))
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
            <div>
                {terms.map((term, idx) => (
                    <div key={idx}>
                        <span>{term}</span>
                        <span>{definitions[idx]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CSVInput;