import { Category } from "@/app/types/category";
import { Term } from "@/app/types/term";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@heroui/react";
import React from "react";
import Delete from "@/app/assets/icons/Delete.svg"


type CategoryInputProps = {
    category: Category;
    handleCategoryChange: (categoryId: string, key: keyof Category, value: string | Term[]) => void;
    terms: Term[];
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    setTerms: React.Dispatch<React.SetStateAction<Term[]>>;
    deleteCategory: (categoryId: string) => void;
};

const CategoryInput = React.memo(function CategoryInput({
    category,
    handleCategoryChange,
    terms,
    categories,
    setCategories,
    setTerms,
    deleteCategory
}: CategoryInputProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onDelete = () => {
        deleteCategory(category.id)
    }


    return (
        <>
            <div className="flex flex-col gap-8 mb-4 p-4 rounded-2xl shadow-sm bg-secondary-700 w-full">
                <div className="flex flex-col gap-2">
                    <Input
                        isRequired={category.terms.filter(term => term.termFrom !== "").length !== 0}
                        isClearable
                        label="Category title"
                        value={category.title}
                        onChange={(e) => handleCategoryChange(category.id, 'title', e.target.value)}
                        onClear={() => { handleCategoryChange(category.id, 'title', "") }}
                        classNames={{
                            inputWrapper: "shadow-sm",
                        }}
                    />
                    <Input
                        isClearable
                        placeholder="A description (optional)"
                        value={category.description}
                        onChange={(e) => handleCategoryChange(category.id, 'description', e.target.value)}
                        onClear={() => handleCategoryChange(category.id, 'description', "")}
                        className="h-full"
                        classNames={{
                            inputWrapper: "shadow-sm",
                        }}
                    />
                    <div className="flex">

                        <Select
                            className="flex-1"
                            isDisabled={terms.filter(term => term.termFrom !== "").length === 0}
                            label="Terms"
                            placeholder={terms.filter(term => term.termFrom !== "").length === 0 ? "Create terms first" : "Add terms"}
                            selectedKeys={new Set(category.terms.map(term => term.id))}
                            selectionMode="multiple"
                            isMultiline={true}
                            onSelectionChange={(keys) => {
                                const keySet = new Set(Array.from(keys as Iterable<string>));
                                const selectedTerms = terms.filter(term => keySet.has(term.id));

                                const updatedCategories = categories.map(cat =>
                                    cat.id === category.id ? { ...cat, terms: selectedTerms } : cat
                                );

                                const updatedTerms = terms.map(term => {
                                    const newCategories = updatedCategories.filter(cat =>
                                        cat.terms.some(t => t.id === term.id)
                                    );
                                    return { ...term, categories: newCategories };
                                });

                                setCategories(updatedCategories);
                                setTerms(updatedTerms);
                            }}
                        >
                            {terms.filter((term) => term.termFrom !== "").map((term) => (
                                <SelectItem key={term.id} textValue={term.termFrom}>{term.termFrom}</SelectItem>
                            ))}
                        </Select>
                        {
                            categories.length > 2 &&
                            <div className="p-1.5">
                                <Button
                                    isIconOnly
                                    type="button"
                                    radius="full"
                                    onPress={category.title === "" ? () => onDelete() : onOpen}
                                    className="
                        flex justify-center items-center size-10 m-[1px] text-4xl shadow-lg bg-secondary-500
                        transition-all duration-100 ease-in
                        hover:size-[42px] hover:m-0 hover:text-[40px] hover:bg-red-500
                        "
                                >
                                    <img src={Delete.src} alt="Delete" />
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete term</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete the term '{category.title}'?</p>
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
})

export default CategoryInput;