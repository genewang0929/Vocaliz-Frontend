import { useRouter } from "next/router";
import {Navbar} from "../../components/navbar"

const VocabularyPage = () => {
    // const router = useRouter();
    // console.log(router.query);

    return (
        <div>
            <Navbar />
            This is Vocabulary page
        </div>
    )
}

export default VocabularyPage;