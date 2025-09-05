import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import React, { useEffect, useRef, useState } from "react";
import Delete from '@/app/assets/icons/Delete.svg'



type TermInputProps = {
    id: string;
    term: string;
    definition: string;
    termLanguage: string | undefined;
    definitionLanguage: string | undefined;
    onChange: (termId: string, field: "term" | "definition", value: string) => void;
    onDelete: (termId: string) => void;
    termsLength: number;
};

const TermInput = React.memo(function TermInput({
    id,
    term,
    definition,
    onChange,
    termLanguage,
    definitionLanguage,
    onDelete,
    termsLength,
}: TermInputProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [inputTerm, setInputTerm] = useState(term)
    const [inputDefinition, setInputDefinition] = useState(definition)

    const [isSelected, setIsSelected] = useState(false);


    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsSelected(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputTerm != term) onChange(id, 'term', inputTerm);
        }, 300)
        return () => clearTimeout(timer)
    }, [inputTerm])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputDefinition != term) onChange(id, 'definition', inputDefinition);
        }, 300)
        return () => clearTimeout(timer)
    }, [inputDefinition])

    return (
        <>
            <div
                ref={wrapperRef}
                key={id}
                className={`flex flex-col gap-2 p-4 rounded-2xl shadow-sm bg-secondary-700 w-full transition-all duration-150 overflow-hidden ${isSelected && termsLength > 2 ? 'h-[140px]' : 'h-[100px]'}`}
            >
                <div className="flex flex-row gap-4">
                    <div className="flex-1">
                        <label className="text-sm font-bold">From {termLanguage ?? ""}</label>
                        <Input
                            isRequired={term !== ""}
                            isClearable
                            placeholder={
                                termLanguage
                                    ? `Enter ${['a', 'e', 'i', 'o', 'u'].includes(termLanguage.charAt(0).toLowerCase()) ? "an" : "a"} ${termLanguage.toLowerCase()} term`
                                    : "Enter a term"
                            }
                            value={inputTerm}
                            onChange={e => setInputTerm(e.target.value)}
                            onClear={() => { onChange(id, 'term', ""); setInputTerm(""); }}
                            classNames={{
                                inputWrapper: "shadow-sm",
                            }}
                            onFocus={() => setIsSelected(true)}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm font-bold">To {definitionLanguage ?? ""}</label>
                        <Input
                            isRequired={term !== ""}
                            isClearable
                            placeholder={
                                definitionLanguage
                                    ? `Enter ${['a', 'e', 'i', 'o', 'u'].includes(definitionLanguage.charAt(0).toLowerCase()) ? "an" : "a"} ${definitionLanguage.toLowerCase()} term`
                                    : "Enter a term"
                            }
                            value={inputDefinition}
                            onChange={e => setInputDefinition(e.target.value)}
                            onClear={() => { onChange(id, 'definition', ""); setInputDefinition(""); }}
                            classNames={{
                                inputWrapper: "shadow-sm",
                            }}
                            onFocus={() => setIsSelected(true)}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    {termsLength > 2 && isSelected &&
                        <Button
                            isIconOnly
                            type="button"
                            radius="full"
                            onPress={term === "" || definition === "" ? () => onDelete(id) : onOpen}
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
                                <p>Are you sure you want to delete the term '{term}'?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onPress={() => {
                                    onDelete(id)
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
}, (prevProps, nextProps) => {
    return prevProps.term === nextProps.term &&
        prevProps.definition === nextProps.definition &&
        prevProps.termLanguage === nextProps.termLanguage &&
        prevProps.definitionLanguage === nextProps.definitionLanguage &&
        prevProps.termsLength === nextProps.termsLength;
});

export default TermInput;