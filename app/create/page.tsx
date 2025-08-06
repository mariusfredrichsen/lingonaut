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
    Spacer,
    Chip
} from "@heroui/react";
import ArrowLeftArrowRightIcon from '@/app/assets/icons/ArrowLeftArrowRight.svg'
import LanguageIcon from '@/app/assets/icons/Language.svg'
import { useCallback, useEffect, useState } from "react";
import TermInput from "./components/TermInput";
import { Term } from "../types/term";
import { Category } from "../types/category";
import { v4 as uuidv4 } from 'uuid';
import CategoryInput from "./components/CategoryInput";



export default function CreatePage() {
    const [languageFrom, setLanguageFrom] = useState<any>(null);
    const [inputValueFrom, setInputValueFrom] = useState("");

    const [languageTo, setLanguageTo] = useState<any>(null);
    const [inputValueTo, setInputValueTo] = useState("");

    const emptyTerm: Term = {
        id: uuidv4(),
        languageFrom: "",
        languageTo: "",
        termFrom: "",
        termTo: "",
        description: "",
        categories: []
    };

    const emptyCategory: Category = {
        id: uuidv4(),
        title: "",
        languageFrom: "",
        languageTo: "",
        description: "",
        terms: [],
    };

    const [terms, setTerms] = useState<Term[]>([emptyTerm]);
    const [categories, setCategories] = useState<Category[]>([emptyCategory])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);

        const courseData = {
            title: formValues.courseTitle,
            description: formValues.courseDescription,
            languageFrom: languageFrom?.name,
            languageTo: languageTo?.name,
            terms: terms,
            categories: categories,
            author: "test"
        };

        console.log(courseData)

        try {

            console.log("ASDASD")
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
        setLanguageFrom(languageTo);
        setLanguageTo(languageFrom);
    };

    const handleTermChange = useCallback(
        (termId: string, key: keyof Term, value: string | Category | Category[]) => {
            setTerms(prevTerms => prevTerms.map(term => {
                if (term.id !== termId) return term;

                if (key === 'categories') {
                    if (Array.isArray(value)) {
                        return { ...term, categories: value as Category[] };
                    } else {
                        const category = value as Category;
                        const containsCategory = term.categories.some((item) => item.id === category.id);
                        if (!containsCategory) {
                            return { ...term, categories: [...term.categories, category] };
                        }
                    }
                    return term;
                }

                return { ...term, [key]: value as string };
            }));
        },
        []
    );

    const handleCategoryChange = useCallback((
        categoryId: string,
        key: keyof Category,
        value: string | Term[]
    ) => {
        setCategories(prevCategories =>
            prevCategories.map(category => {
                if (category.id !== categoryId) return category;

                if (key === 'terms') {
                    return {
                        ...category,
                        terms: value as Term[]
                    };
                } else {
                    return {
                        ...category,
                        [key]: value as string
                    };
                }
            })
        );
    }, []);

    const deleteTerm = useCallback((termId: string) => {
        setCategories(prevCategories =>
            prevCategories.map(category => ({
                ...category,
                terms: category.terms.filter(term => term.id !== termId)
            }))
        );
        setTerms(prevTerms =>
            prevTerms.filter(
                term => term.id !== termId
            )
        );
    }, []);

    const deleteCategory = useCallback((categoryId: string) => {
        setTerms(prevTerms =>
            prevTerms.map(term => ({
                ...term, categories: term.categories.filter(category => category.id !== categoryId)
            }))
        )
        setCategories(prevCategories =>
            prevCategories.filter(
                category => category.id !== categoryId
            )
        )
    }, [])

    const handleAddTerm = useCallback((position: number) => {
        setTerms(prevTerms => {
            const newTerm: Term = {
                ...emptyTerm,
                id: uuidv4(),
                languageFrom: languageFrom?.name || "",
                languageTo: languageTo?.name || ""
            };

            const updated = [...prevTerms];

            if (position < 0 || position >= prevTerms.length) {
                updated.push(newTerm);
            } else {
                updated.splice(position, 0, newTerm);
            }

            return updated;
        });
    }, [languageFrom, languageTo]);


    const handleAddCategory = useCallback((position: number) => {
        setCategories(prevCategories => {
            const newCategory = {
                ...emptyCategory, id: uuidv4(),
                languageFrom: languageFrom?.name || "",
                languageTo: languageTo?.name || ""
            };
            const updated = [...prevCategories];

            if (position < 0 || position >= prevCategories.length) {
                updated.push(newCategory);
            } else {
                updated.splice(position, 0, newCategory);
            }

            return updated;
        });
    }, [languageFrom, languageTo]);



    useEffect(() => {
        setTerms(prevTerms =>
            prevTerms.map(term => ({
                ...term,
                languageFrom: languageFrom?.name || "",
                languageTo: languageTo?.name || ""
            }))
        );

        setCategories(prevCategories =>
            prevCategories.map(category => ({
                ...category,
                languageFrom: languageFrom?.name || "",
                languageTo: languageTo?.name || "",
                terms: category.terms.map(term => ({
                    ...term,
                    languageFrom: languageFrom?.name || "",
                    languageTo: languageTo?.name || ""
                }))
            }))
        );
    }, [languageFrom, languageTo]);



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
                        name="languageFrom"
                        isRequired
                        selectedKey={languageFrom?.name ?? null}
                        inputValue={inputValueFrom}
                        onInputChange={setInputValueFrom}
                        onSelectionChange={(key) => {
                            const selected = languages.find(lang => lang.name === key);
                            if (selected) {
                                setLanguageFrom(selected);
                                setInputValueFrom(selected.name); // sync input with selection
                            }
                        }}
                        onClear={() => {
                            setLanguageFrom(undefined);
                            setInputValueFrom(""); // clear input too
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
                        name="languageTo"
                        isRequired
                        selectedKey={languageTo?.name ?? null}
                        inputValue={inputValueTo}
                        onInputChange={setInputValueTo}
                        onSelectionChange={(key) => {
                            const selected = languages.find(lang => lang.name === key);
                            if (selected) {
                                setLanguageTo(selected);
                                setInputValueTo(selected.name);
                            }
                        }}
                        onClear={() => {
                            setLanguageTo(undefined);
                            setInputValueTo("");
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
                                term={{
                                    ...term,
                                    categories: term.categories.map(cat => categories.find(c => c.id === cat.id) || cat),
                                }}
                                handleTermChange={handleTermChange}
                                handleCategoryChange={handleCategoryChange}
                                languageFrom={languageFrom}
                                languageTo={languageTo}
                                deleteTerm={deleteTerm}
                                terms={terms}
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

                    <div className="flex flex-col flex-2 items-center gap-4">
                        <Button
                            isIconOnly
                            type="button"
                            radius="full"
                            onPress={() => handleAddCategory(0)}
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
                        {categories.map((category) => {
                            return (
                                <CategoryInput
                                    key={category.id}
                                    category={category}
                                    handleCategoryChange={handleCategoryChange}
                                    terms={terms}
                                    categories={categories}
                                    setCategories={setCategories}
                                    setTerms={setTerms}
                                    deleteCategory={deleteCategory}
                                />
                            )
                        })}
                        <Button
                            isIconOnly
                            type="button"
                            radius="full"
                            onPress={() => handleAddCategory(-1)}
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
