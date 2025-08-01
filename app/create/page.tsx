'use client';

import languages, { getLanguage } from "language-flag-colors";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Select,
    SelectItem,
    AutocompleteItem,
    Autocomplete,
    Avatar,
    Button,
    Spacer
} from "@heroui/react";
import ArrowLeftArrowRightIcon from '@/app/utils/ArrowLeftArrowRight.svg'
import LanguageIcon from '@/app/utils/Language.svg'
import { useState } from "react";


type Term = {
    fromLanguage: string
    toLanguage: string
    fromTerm: string
    toTerm: string
    description?: string
}


export default function CreatePage() {
    const [languageFrom, setLanguageFrom] = useState<any>(null);
    const [languageTo, setLanguageTo] = useState<any>(null);

    const emptyTerm: Term = {
        fromLanguage: "",
        toLanguage: "",
        fromTerm: "",
        toTerm: "",
        description: ""
    };
    const [terms, setTerms] = useState<Term[]>([emptyTerm]);

    const onSubmit = (e: any) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));
    };

    const swapLanguages = () => {
        setLanguageFrom(languageTo);
        setLanguageTo(languageFrom);
    };

    const handleTermChange = (index: number, key: keyof Term, value: string) => {
        const updatedTerms = [...terms];
        updatedTerms[index][key] = value;
        setTerms(updatedTerms);
    };

    const handleAddTerm = () => {
        setTerms(prev => [...prev, { ...emptyTerm }]);
    };


    return (
        <div className="p-4 w-full">
            <header className="mb-2">
                <h1>Create a new language course</h1>
            </header>
            <Form onSubmit={onSubmit}>
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
                        name="languageFrom"
                        isRequired
                        selectedKey={languageFrom?.name}
                        onSelectionChange={(key) => {
                            const selected = languages.find(lang => lang.name === key);
                            if (selected) setLanguageFrom(selected);
                        }}
                        onClear={() => {
                            setLanguageFrom(undefined);
                        }}
                        startContent={
                            <img src={LanguageIcon.src} className="w-5 h-5" />
                        }
                        inputProps={{
                            classNames: {
                                inputWrapper: "shadow-sm bg-secondary-700",
                                label: "text-text-50"

                            },
                        }}
                    >
                        {languages.map((language: any) =>
                            <AutocompleteItem
                                key={language.name}
                                startContent={
                                    <Avatar alt={language.name} className="w-6 h-6" src={`https://flagcdn.com/${language.countryCode}.svg`} />
                                }
                            >
                                {language.name}
                            </AutocompleteItem>
                        )}
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
                        name="languageTo"
                        isRequired
                        selectedKey={languageTo?.name}
                        onSelectionChange={(key) => {
                            const selected = languages.find(lang => lang.name === key);
                            if (selected) setLanguageTo(selected);
                        }}
                        onClear={() => {
                            setLanguageTo(undefined);
                        }}
                        startContent={
                            <img src={LanguageIcon.src} className="w-5 h-5" />
                        }
                        inputProps={{
                            classNames: {
                                inputWrapper: "shadow-sm bg-secondary-700",
                                label: "text-text-50"
                            },
                        }}
                    >
                        {languages.map((language: any) =>
                            <AutocompleteItem
                                key={language.name}
                                startContent={
                                    <Avatar alt={language.name} className="w-6 h-6" src={`https://flagcdn.com/${language.countryCode}.svg`} />
                                }
                            >
                                {language.name}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>

                </div>
                <Spacer />

                <h2>Create terms or categories</h2>
                <div className="w-full">
                    {terms.map((term, idx) => (
                        <div key={idx} className="flex flex-row gap-8 mb-4 p-4 rounded-2xl shadow-sm bg-secondary-700">
                            <div className="flex-1">
                                <Input
                                    placeholder={
                                        languageFrom?.name
                                            ? `Enter ${['a', 'e', 'i', 'o', 'u'].includes(languageFrom.name.charAt(0).toLowerCase()) ? "an" : "a"} ${languageFrom.name.toLowerCase()} term`
                                            : ""
                                    }
                                    value={term.fromTerm}
                                    onChange={e => handleTermChange(idx, 'fromTerm', e.target.value)}
                                    classNames={{
                                        inputWrapper: "shadow-sm",
                                    }}
                                />
                                <label className="text-sm font-bold">From {languageFrom?.name ?? ""}</label>
                            </div>
                            <div className="flex-1">
                                <Input
                                    placeholder={
                                        languageTo?.name
                                            ? `Enter ${['a', 'e', 'i', 'o', 'u'].includes(languageTo.name.charAt(0).toLowerCase()) ? "an" : "a"} ${languageTo.name.toLowerCase()} term`
                                            : ""
                                    }
                                    value={term.toTerm}
                                    onChange={e => handleTermChange(idx, 'toTerm', e.target.value)}
                                    classNames={{
                                        inputWrapper: "shadow-sm",
                                    }}
                                />
                                <label className="text-sm font-bold">To {languageTo?.name ?? ""}</label>
                            </div>
                        </div>
                    ))}

                    <Button
                        type="button"
                        onPress={handleAddTerm}
                        className="mt-2"
                    >
                        Add term/category
                    </Button>
                </div>
            </Form>
        </div>
    );
}
