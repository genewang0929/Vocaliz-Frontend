import axios from "axios"

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

export const renameCategory = async (categoryName: string, categoryId: string) => {
    await axios.put(
        `http://localhost:8080/category/rename/${categoryId}`,
        {
            newCategoryName: categoryName
        }
    )
}

export const deleteACategory = async (categoryId: string) => {
    await axios.delete(
        `http://localhost:8080/category/${categoryId}`
    )
}


/* -----------------Quiz APIs----------------- */

export const getQuizList = async (rankLV: number, wordNum: number) => {
    let categoryId = '62da1c83b7234e30a3070cc3';

    const response = await axios.get(
        `http://localhost:8080/quizWords/${categoryId}?rankLV=${rankLV}&wordNum=${wordNum}`
    )

    return response.data.vocabulary;
}


/* -----------------Search APIs----------------- */

export const getSearchList = async (offset: number, vocab: string) => {
    let email = 'genewang7@gmail.com';

    const response = await axios.get(
        `http://localhost:8080/search/${email}/${offset}/10?word=${vocab}`
    )

    const searchedVocab = response.data.vocabulary;
    const searchedVocabList = searchedVocab.items;
    const vocabPages: number[] = [];
    for (let i = 1; i <= searchedVocab.totalPages; i++)
        vocabPages.push(i);
    if (vocabPages.length === 0)
        vocabPages.push(1);

    return { searchedVocabList, vocabPages };
}


/* -----------------Verification APIs----------------- */

export const signUp = async (email: string, password: string, name: string) => {
    await axios.post(
        `http://localhost:8080/verification/signup`,
        {
            email: email,
            password: password,
            name: name
        }
    )
}

export const verifyCode = async (email: string, code: string) => {
    await axios.put(
        `http://localhost:8080/verification/verify/${email}/${code}`
    )
}

export const resendCodeMail = async (email: string) => {
    await axios.post(
        `http://localhost:8080/verification/resendCode/${email}`
    )
}


export const login = async (email: string, password: string) => {
    const response = await axios.post(
        `http://localhost:8080/verification/login`, 
        {
            email: email,
            password: password
        }
    )
    return response.data;
}

export const forgotPassword = async (email: string) => {
    const response = await axios.post(
        `http://localhost:8080/verification/randomPassword/${email}`
    )
}

export const resetPassword = async (password: string, newPassword: string, email: string) => {
    await axios.post(
        `http://localhost:8080/verification/resetPassword`,
        {
            password: password,
            newPassword: newPassword,
            email: email
        }
    )
}