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


export default function CreatePage() {
    const [languageFrom, setLanguageFrom] = useState<string | null>(null);
    const [languageTo, setLanguageTo] = useState<string | null>(null);


    const onSubmit = (e: any) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));
    };

    const swapLanguages = () => {
        setLanguageFrom(languageTo);
        setLanguageTo(languageFrom);
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
                        selectedKey={languageFrom ?? undefined}
                        onSelectionChange={(key) => setLanguageFrom(key as string)}
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
                        {languages.map((language: any, index: number) =>
                            <AutocompleteItem
                                key={index}
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
                        selectedKey={languageTo ?? undefined}
                        onSelectionChange={(key) => setLanguageTo(key as string)}
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
                        {languages.map((language: any, index: number) =>
                            <AutocompleteItem
                                key={index}
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
                {/* TODO add list of terms that has been created */}
                <div className="h-screen">
                    asd
                </div>
            </Form>
        </div>
    );
}
