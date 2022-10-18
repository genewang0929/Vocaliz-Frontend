export interface VocabularyInterface {
    vocabularyId: string;
    word: string;
    definition: string;
    rankLV: number;
    parentCategory: string;
    creatorEmail: string;
}

export interface CategoryInterface {
    categoryId: string;
    categoryName: string;
    vocabularies: string[];
    creatorEmail: string;
}

export interface SearchInterface {
    word: string;
    definition: string;
    parentCategoryId: string;
    parentCategoryName: string;
}