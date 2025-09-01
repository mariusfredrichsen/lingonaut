'use client';

import languages from "language-flag-colors";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import {
    AutocompleteItem,
    Autocomplete,
    Avatar,
    Button,
    Spacer,
} from "@heroui/react";
import ArrowLeftArrowRightIcon from '@/app/assets/icons/ArrowLeftArrowRight.svg'
import LanguageIcon from '@/app/assets/icons/Language.svg'
import { useCallback, useEffect, useState } from "react";
import TermInput from "./components/TermInput";
import { Term } from "../types/term";
import { v4 as uuidv4 } from 'uuid';



export default function CreatePage() {
    const [termLanguage, setTermLanguage] = useState<any>(null);
    const [termLanguageValue, setTermLanguageValue] = useState("");

    const [definitionLanguage, setDefinitionLanguage] = useState<any>(null);
    const [definitionLanguageValue, setDefinitionLanguageValue] = useState("");

    const emptyTerm: Term = {
        id: uuidv4(),
        term: "",
        definition: "",
        termLanguage: termLanguageValue ?? "",
        definitionLanguage: definitionLanguageValue ?? "",
        description: "",
    };

    const [terms, setTerms] = useState<Term[]>([emptyTerm]);


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);

        const courseData = {
            title: formValues.courseTitle,
            description: formValues.courseDescription,
            termLanguage: termLanguage?.name,
            definitionLanguage: definitionLanguage?.name,
            terms: terms,
            author: "test"
        };

        console.log(courseData)

        try {
            const res = await fetch("http://localhost:3000/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });
            console.log(res)


            if (!res.ok) {
                throw new Error("Failed to create course");
            }

            const result = await res.json();
            console.log("Course created:", result);
        } catch (err) {
            console.error(err);
        }
    };

    const swapLanguages = () => {
        setTermLanguage(definitionLanguage);
        setDefinitionLanguage(termLanguage);
    };

    useEffect(() => {
        setTerms(prevTerms =>
            prevTerms.map(term => ({
                ...term,
                termLanguage: termLanguage?.name || "",
                definitionLanguage: definitionLanguage?.name || ""
            }))
        );
    }, [termLanguage, definitionLanguage]);


    const handleAddTerm = (index: number) => {
        setTerms(prevTerms => {
            const newTerm = { ...emptyTerm, id: uuidv4() };
            const newTerms = [...prevTerms];
            if (index < 0 || index > prevTerms.length) {
                newTerms.push(newTerm);
            } else {
                newTerms.splice(index, 0, newTerm);
            }
            return newTerms;
        });
    }

    const handleTermChange = useCallback(
        (id: string, field: "term" | "definition", value: string) => {
            setTerms((prev) =>
                prev.map(term => {
                    return id != term.id ? term : { ...term, [field]: value }
                })
            )
        },
        [setTerms]
    )

    const deleteTerm = (id: string) => {
        setTerms(terms.filter(term => term.id != id))
    }


    return (
        <div className="p-4 w-full h-full">
            <Form onSubmit={onSubmit}>
                <header className="flex w-full justify-between mb-2">
                    <h1>Create a new language course</h1>
                    <Button
                        type="submit"
                    >
                        Create course
                    </Button>
                </header>
                <Input
                    isRequired
                    isClearable
                    label="Course title"
                    name="courseTitle"
                    type="text"
                    classNames={{
                        inputWrapper: [
                            "shadow-sm",
                            "bg-secondary-700",
                        ],
                        label: "text-text-50"
                    }}
                />
                <Input
                    isClearable
                    type="text"
                    placeholder="A description (optional) "
                    name="courseDescription"
                    classNames={{
                        inputWrapper: "shadow-sm bg-secondary-700",
                        input: "placeholder:text-text-50"
                    }}
                />
                <Spacer />
                <h2>Select languages</h2>
                <div className="flex flex-row w-full gap-4 items-center">

                    <Autocomplete
                        label="Select from"
                        name="termLanguage"
                        isRequired
                        selectedKey={termLanguage?.name ?? null}
                        inputValue={termLanguageValue}
                        onInputChange={setTermLanguageValue}
                        onSelectionChange={(key) => {
                            const selected = languages.find(lang => lang.name === key);
                            if (selected) {
                                setTermLanguage(selected);
                                setTermLanguageValue(selected.name); // sync input with selection
                            }
                        }}
                        onClear={() => {
                            setTermLanguage(undefined);
                            setTermLanguageValue(""); // clear input too
                        }}
                        startContent={<img src={LanguageIcon.src} className="w-5 h-5" />}
                        inputProps={{
                            classNames: {
                                inputWrapper: "shadow-sm bg-secondary-700",
                                label: "text-text-50"
                            },
                        }}
                    >
                        {languages.map((language: any) => (
                            <AutocompleteItem
                                key={language.name}
                                textValue={language.name}
                                startContent={
                                    <Avatar alt={language.name} className="w-6 h-6" src={`https://flagcdn.com/${language.countryCode}.svg`} />
                                }
                            >
                                {language.name}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>

                    <Button
                        isIconOnly
                        className="bg-transparent"
                        type="button"
                        onPress={swapLanguages}
                    >
                        <img src={ArrowLeftArrowRightIcon.src} className="w-6 h-6" />
                    </Button>
                    <Autocomplete
                        label="Select to"
                        name="definitionLanguage"
                        isRequired
                        selectedKey={definitionLanguage?.name ?? null}
                        inputValue={definitionLanguageValue}
                        onInputChange={setDefinitionLanguageValue}
                        onSelectionChange={(key) => {
                            const selected = languages.find(lang => lang.name === key);
                            if (selected) {
                                setDefinitionLanguage(selected);
                                setDefinitionLanguageValue(selected.name);
                            }
                        }}
                        onClear={() => {
                            setDefinitionLanguage(undefined);
                            setDefinitionLanguageValue("");
                        }}
                        startContent={<img src={LanguageIcon.src} className="w-5 h-5" />}
                        inputProps={{
                            classNames: {
                                inputWrapper: "shadow-sm bg-secondary-700",
                                label: "text-text-50"
                            },
                        }}
                    >
                        {languages.map((language: any) => (
                            <AutocompleteItem
                                key={language.name}
                                textValue={language.name}
                                startContent={
                                    <Avatar alt={language.name} className="w-6 h-6" src={`https://flagcdn.com/${language.countryCode}.svg`} />
                                }
                            >
                                {language.name}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>


                </div>
                <Spacer />

                <h2>Create terms or categories</h2>
                <div className="flex flex-row w-full gap-4">
                    <div className="flex flex-col flex-3 items-center gap-4">
                        <Button
                            isIconOnly
                            type="button"
                            radius="full"
                            onPress={() => handleAddTerm(0)}
                            className="
                                flex justify-center items-center size-10 m-[1px] text-4xl shadow-lg bg-secondary-500
                                transition-all duration-50 ease-in
                                hover:size-[42px] hover:m-0 hover:text-[40px]
                            "
                        >
                            <span>
                                +
                            </span>
                        </Button>
                        {terms.map((term) => (
                            <TermInput
                                key={term.id}
                                id={term.id}
                                term={term.term}
                                definition={term.definition}
                                termLanguage={termLanguage?.name}
                                definitionLanguage={definitionLanguage?.name}
                                onChange={handleTermChange}
                                onDelete={deleteTerm}
                                termsLength={terms.length}
                            />
                        ))}
                        <Button
                            isIconOnly
                            type="button"
                            radius="full"
                            onPress={() => handleAddTerm(-1)}
                            className="
                        flex justify-center items-center size-10 m-[1px] text-4xl shadow-lg bg-secondary-500
                        transition-all duration-50 ease-in
                        hover:size-[42px] hover:m-0 hover:text-[40px]
                        "
                        >
                            <span>
                                +
                            </span>
                        </Button>
                    </div>
                </div>
            </Form >
        </div >
    );
}
