import axios from "axios"
import { CategoryInterface, VocabularyInterface } from "../interface";


export const getAllVocab = async () => {
    let categoryId = '62da1c83b7234e30a3070cc3';
    let offset = 0;
    let pageNumber = 10;

    const response = await axios.get(
        `http://localhost:8080/allWords/${categoryId}/${offset}/${pageNumber}`
    );
    const allVocab = response.data.vocabulary;

    return allVocab;
}

export const getAllCategories = async () => {
    let email = 'genewang7@gmail.com';

    const response = await axios.get(
        `http://localhost:8080/category/${email}`
    );
    
    const allCategories: CategoryInterface[] = new Array();
    console.log(response.data);

    return allCategories;
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