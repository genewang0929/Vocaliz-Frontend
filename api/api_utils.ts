import { useToast } from "@chakra-ui/react";
import axios from "axios"
import { getCookie, setCookie } from "typescript-cookie";
import { CategoryInterface } from "../interface";

const API_URL = "localhost:8080";

/* -----------------Vocabulary APIs----------------- */

export const getAllVocab = async (offset: number, categoryId: string | undefined) => {
    try {
        const response = await axios.get(
            `http://${API_URL}/allWords/${categoryId}/${offset}/10`, {
            headers: {
                'Authorization': 'Bearer ' + getCookie("token"),
            }
        }
        );
        const allVocab = response.data.vocabulary;
        const allVocabList = allVocab.items;
        const vocabPages: number[] = [];
        for (let i = 1; i <= allVocab.totalPages; i++)
            vocabPages.push(i);
        if (vocabPages.length === 0)
            vocabPages.push(1);

        return { allVocabList, vocabPages };
    } catch (e) {
        throw 'Forbidden Request';
    }
}

export const getVocabByRankLV = async (offset: number, rankLV: number, categoryId: string | undefined) => {
    try {
        const response = await axios.get(
            `http://${API_URL}/rankLVWords/${categoryId}/${rankLV}/${offset}/10`, {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
        const vocabByRankLV = response.data.vocabulary;
        const vocabByRankLVList = vocabByRankLV.items;
        const vocabPages: number[] = [];
        for (let i = 1; i <= vocabByRankLV.totalPages; i++)
            vocabPages.push(i);
        if (vocabPages.length === 0)
            vocabPages.push(1);
    
        return { vocabByRankLVList, vocabPages };
    } catch (e) {
        throw 'Forbidden Request';
    }
}

export const deleteVocab = async (wordId: string) => {
    try {
        await axios.delete(
            `http://${API_URL}/word/${wordId}`, {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
    } catch (e) {
        throw 'Forbidden Request';
    }
}

export const createVocab = async (word: string, definition: string, email: string | undefined, categoryId: string | undefined) => {
    try {
        await axios.post(
            `http://${API_URL}/word/${email}/${categoryId}`,
            {
                word: word,
                definition: definition
            }, 
            {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
    } catch (e) {
        throw 'Forbidden Request';
    }
}

export const editVocab = async (wordId: string, word: string, definition: string) => {
    try {
        await axios.put(
            `http://${API_URL}/word/${wordId}`,
            {
                word: word,
                definition: definition
            }, 
            {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
    } catch (e) {
        throw 'Forbidden Request';
    }
}

export const editVocabRankLV = async (wordId: string, rankLV: number) => {
    try {
        await axios.put(
            `http://${API_URL}/editRankLV/${wordId}`,
            {
                rankLV: rankLV
            }, 
            {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
    } catch (e) {
        throw 'Forbidden Request';
    }
}


/* -----------------Category APIs----------------- */

export const getAllCategories = async (email: string | undefined) => {
    try {
        const response = await axios.get(
            `http://${API_URL}/category/allCategories/${email}`, {
            headers: {
                'Authorization': 'Bearer ' + getCookie("token"),
            }
        }
        );

        return response.data.categories;
    } catch (e) {
        throw 'Forbidden Request';
    }
}

export const createCategory = async (categoryName: string, email: string | undefined) => {
    try {
        await axios.post(
            `http://${API_URL}/category/${email}`,
            {
                categoryName: categoryName
            }, 
            {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
    } catch (e) {
        throw 'Forbidden Request';
    }
}

export const renameCategory = async (categoryName: string, categoryId: string) => {
    try {
        await axios.put(
            `http://${API_URL}/category/rename/${categoryId}`,
            {
                newCategoryName: categoryName
            }, 
            {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
    } catch (e) {
        throw 'Forbidden Request';
    }
}

export const deleteACategory = async (categoryId: string) => {
    try {
        await axios.delete(
            `http://${API_URL}/category/${categoryId}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
    } catch (e) {
        throw 'Forbidden Request';
    }
}

export const getCategoryByName = async (email: string | undefined, categoryName: string) => {
    try {
        const response = await axios.get(
            `http://${API_URL}/category/getCategoryByName/${email}/${categoryName}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
        const category:CategoryInterface = response.data.category;
        const getCategoryId = category.categoryId
        const getCategoryName = category.categoryName;
        return {getCategoryId, getCategoryName};

    } catch (e) {
        throw 'Forbidden Request';
    }
}


/* -----------------Quiz APIs----------------- */

export const getQuizList = async (rankLV: number, wordNum: number, categoryId: string | undefined) => {
    try {
        const response = await axios.get(
            `http://${API_URL}/quizWords/${categoryId}?rankLV=${rankLV}&wordNum=${wordNum}`, {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
    
        return response.data.vocabulary;
    } catch (e) {
        throw 'Forbidden Request';
    }
}


/* -----------------Search APIs----------------- */

export const getSearchList = async (offset: number, vocab: string, email: string | undefined) => {
    try {
        const response = await axios.get(
            `http://${API_URL}/search/${email}/${offset}/10?word=${vocab}`, {
                headers: {
                    'Authorization': 'Bearer ' + getCookie("token"),
                }
            }
        )
    
        const searchedVocab = response.data.vocabulary;
        const searchedVocabList = searchedVocab.items;
        const vocabPages: number[] = [];
        for (let i = 1; i <= searchedVocab.totalPages; i++)
            vocabPages.push(i);
        if (vocabPages.length === 0)
            vocabPages.push(1);
    
        return { searchedVocabList, vocabPages };
    } catch (e) {
        throw 'Forbidden Request';
    }
}


/* -----------------Verification APIs----------------- */

export const signUp = async (email: string, password: string, name: string) => {
    await axios.post(
        `http://${API_URL}/verification/signup`,
        {
            email: email,
            password: password,
            name: name
        }
    )
}

export const verifyCode = async (email: string, code: string) => {
    await axios.put(
        `http://${API_URL}/verification/verify/${email}/${code}`
    )
}

export const resendCodeMail = async (email: string) => {
    await axios.post(
        `http://${API_URL}/verification/resendCode/${email}`
    )
}


export const login = async (email: string, password: string) => {
    const response = await axios.post(
        `http://${API_URL}/verification/login`,
        {
            email: email,
            password: password
        }
    )
    return response.data.token;
}

export const forgotPassword = async (email: string) => {
    const response = await axios.post(
        `http://${API_URL}/verification/randomPassword/${email}`
    )
}

export const resetPassword = async (password: string, newPassword: string, email: string) => {
    await axios.post(
        `http://${API_URL}/verification/resetPassword`,
        {
            password: password,
            newPassword: newPassword,
            email: email
        }
    )
}