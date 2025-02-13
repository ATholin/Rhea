import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Search: NextPage = () => {
    //get search query from url
    const router = useRouter();
    const searchQuary = router.query.q as string;
    const [courses, setCourses] = useState<any[]>([]);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (searchQuary) {
            fetch('/api/search?q=' + searchQuary).then
                (res => res.json()).then(data => {

                    setCourses(data);
                }
                ).finally(() => {
                    setLoading(false);
                }
                )
        }
    }
        , [searchQuary]);
    return (
        <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 px-4 py-10 shadow rounded-lg mb-24 flex-1 flex flex-col dark:border dark:border-white dark:text-white     ">
            <h1 className="text-4xl font-medium mb-5 xl:w-[72rem] transition-all  ">{t('searchResultsFor', { name: searchQuary })}</h1>

            {courses.length === 0 && !loading && <div className="flex-1 min-h-full flex justify-center "><h2>{t('noResults')}</h2></div>}
            {loading && <div className="flex-1 min-h-full flex justify-center ">
                <svg className="animate-spin  h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>}
            <div >

                <ul className="flex flex-col gap-5">
                    {courses.length > 0 && courses.map(course =>
                        <Link
                            key={course.code}
                            href={{
                            pathname: "/course",
                            query: {
                                q: course.code
                            }
                        }}>
                            <a 
                            className="flex sm:flex-row gap-6 flex-col items-center justify-between border rounded-xl dark:bg-black dark:border-white dark:hover:bg-orange-700 border-gray-200 bg-orange-50/20 py-5 px-4 shadow-sm sm:gap-2 hover:bg-gray-50 hover:shadow transition-all duration-300">
                                <div>
                                    <h2>
                                        {course.name}
                                    </h2>
                                    <h3 className="font-medium">
                                        {course.code}
                                    </h3>
                                </div>
                                <div >
                                    <div className="text-orange-500 hover:text-orange-700 py-2 px-5 bg-white shadow rounded-xl  whitespace-nowrap dark:hover:text-white dark:bg-black dark:border-white dark:hover:bg-orange-700 dark:border ">{ t('goToCourse')}</div>
                                </div>
                            </a>
                        </Link>)}
                </ul>
            </div>
        </div>
    );
}
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            // Will be passed to the page component as props
        },
    };
}
export default Search;