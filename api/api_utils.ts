import axios from "axios"
import { CategoryInterface, VocabularyInterface } from "../interface";

/* -----------------Vocabulary APIs----------------- */

export const getAllVocab = async (offset: number) => {
    let categoryId = '62da1c83b7234e30a3070cc3';

    const response = await axios.get(
        `http://localhost:8080/allWords/${categoryId}/${offset}/10`
    );
    const allVocab = response.data.vocabulary;
    const allVocabList = allVocab.items;
    const vocabPages: number[] = [];
    for (let i = 1; i <= allVocab.totalPages; i++)
        vocabPages.push(i);
    if (vocabPages.length === 0)
        vocabPages.push(1);

    return { allVocabList, vocabPages };
}

export const getVocabByRankLV = async (offset: number, rankLV: number) => {
    let categoryId = '62da1c83b7234e30a3070cc3';

    const response = await axios.get(
        `http://localhost:8080/rankLVWords/${categoryId}/${rankLV}/${offset}/10`
    )
    const vocabByRankLV = response.data.vocabulary;
    const vocabByRankLVList = vocabByRankLV.items;
    const vocabPages: number[] = [];
    for (let i = 1; i <= vocabByRankLV.totalPages; i++)
        vocabPages.push(i);
    if (vocabPages.length === 0)
        vocabPages.push(1);

    return { vocabByRankLVList, vocabPages };
}

export const deleteVocab = async (wordId: string) => {
    await axios.delete(
        `http://localhost:8080/word/${wordId}`
    )
}

export const createVocab = async (word: string, definition: string) => {
    let email = 'genewang7@gmail.com';
    let categoryId = '62da1c83b7234e30a3070cc3';

    await axios.post(
        `http://localhost:8080/word/${email}/${categoryId}`,
        {
            word: word,
            definition: definition
        }
    )
}

export const editVocab = async (wordId: string, word: string, definition: string) => {
    await axios.put(
        `http://localhost:8080/word/${wordId}`,
        {
            word: word,
            definition: definition
        }
    )
}

export const editVocabRankLV = async (wordId: string, rankLV: number) => {
    await axios.put(
        `http://localhost:8080/editRankLV/${wordId}`,
        {
            rankLV: rankLV
        }
    )
}


/* -----------------Category APIs----------------- */

export const getAllCategories = async () => {
    let email = 'genewang7@gmail.com';

    const response = await axios.get(
        `http://localhost:8080/category/allCategories/${email}`
    );

    console.log(response.data.categories);

    return response.data.categories;
}

export const createCategory = async (categoryName: string) => {
    let email = 'genewang7@gmail.com';

    await axios.post(
        `http://localhost:8080/category/${email}`,
        {
            categoryName: categoryName
        }
    )
}