import axios from "axios"
import { CategoryInterface, VocabularyInterface } from "../interface";


export const getAllVocab = async () => {
    let categoryId = '62da1c83b7234e30a3070cc3';
    let offset = 0;
    let pageNumber = 10;

    const response = await axios.get(
        `http://localhost:8080/allWords/${categoryId}/${offset}/${pageNumber}`
    );
    const allVocab: VocabularyInterface[] = response.data.vocabulary;

    return allVocab;
}

export const getAllCategories = async () => {
    let email = 'genewang7@gmail.com';

    const response = await axios.get(
        `http://localhost:8080/category/${email}`
    );
    
    const allCategories: CategoryInterface[] = new Array();
    // for (const key in response.data) {
    //     allCategories.push({
    //         id: key,
    //         ...response.data[key]
    //     })
    // }
    console.log(response.data);

    return allCategories;
}