export interface VocabularyInterface {
    id: string;
    word: string;
    definition: string;
    rankLV: number;
    parentCategory: string;
    creatorEmail: string;
}

export interface CategoryInterface {
    id: string;
    categoryName: string;
    vocabularies: string[];
    creatorEmail: string;
}