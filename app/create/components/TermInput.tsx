import { Category } from "@/app/types/category";
import { Term } from "@/app/types/term";
import { Button, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import React from "react";
import Delete from '@/app/assets/icons/Delete.svg'



type TermInputProps = {
    term: Term;
    handleTermChange: (termId: string, key: keyof Term, value: string | Category | Category[]) => void;
    handleCategoryChange: (categoryId: string, key: keyof Category, value: string | Term[]) => void;
    languageFrom?: { name: string };
    languageTo?: { name: string };
    deleteTerm: (termId: string) => void;
    terms: Term[]
};

const TermInput = React.memo(function TermInput({
    term,
    handleTermChange,
    handleCategoryChange,
    languageFrom,
    languageTo,
    deleteTerm,
    terms,
}: TermInputProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onDelete = () => {
        deleteTerm(term.id)
    }


    return (
        <>
            <div key={term.id} className="flex flex-col gap-2 p-4 rounded-2xl shadow-sm bg-secondary-700 w-full">
                <div className="flex flex-row gap-4">
                    <div className="flex-1">
                        <label className="text-sm font-bold">From {languageFrom?.name ?? ""}</label>
                        <Input
                            isRequired={term.termTo !== ""}
                            isClearable
                            placeholder={
                                languageFrom?.name
                                    ? `Enter ${['a', 'e', 'i', 'o', 'u'].includes(languageFrom.name.charAt(0).toLowerCase()) ? "an" : "a"} ${languageFrom.name.toLowerCase()} term`
                                    : "Enter a term"
                            }
                            value={term.termFrom}
                            onChange={e => handleTermChange(term.id, 'termFrom', e.target.value)}
                            onClear={() => { handleTermChange(term.id, 'termFrom', ""); }}
                            classNames={{
                                inputWrapper: "shadow-sm",
                            }}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm font-bold">To {languageTo?.name ?? ""}</label>
                        <Input
                            isRequired={term.termFrom !== ""}
                            isClearable
                            placeholder={
                                languageTo?.name
                                    ? `Enter ${['a', 'e', 'i', 'o', 'u'].includes(languageTo.name.charAt(0).toLowerCase()) ? "an" : "a"} ${languageTo.name.toLowerCase()} term`
                                    : "Enter a term"
                            }
                            value={term.termTo}
                            onChange={e => handleTermChange(term.id, 'termTo', e.target.value)}
                            onClear={() => handleTermChange(term.id, 'termTo', "")}
                            classNames={{
                                inputWrapper: "shadow-sm",
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-wrap gap-2">
                        {term.categories.map((category) => {
                            return (
                                <Chip
                                    key={category.id}
                                    onClose={() => {
                                        handleTermChange(term.id, 'categories', term.categories.filter(item => item.id !== category.id))
                                        handleCategoryChange(category.id, 'terms', category.terms.filter(item => item.id !== term.id))
                                    }}
                                    className="bg-background-900"
                                >
                                    {category.title}
                                </Chip>
                            )
                        })}
                    </div>
                    {terms.length > 2 &&
                        <Button
                            isIconOnly
                            type="button"
                            radius="full"
                            onPress={term.termFrom === "" ? () => onDelete() : onOpen}
                            className="
                        flex justify-center items-center size-10 m-[1px] text-4xl shadow-lg bg-secondary-500
                        transition-all duration-100 ease-in
                        hover:size-[42px] hover:m-0 hover:text-[40px] hover:bg-red-500
                        "
                        >
                            <img src={Delete.src} alt="Delete" />
                        </Button>
                    }
                </div>
            </div >
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete term</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete the term '{term.termFrom}'?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onPress={() => {
                                    onDelete()
                                    onClose()
                                }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
});

export default TermInput;