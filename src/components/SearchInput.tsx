import { history_icon, icon_search } from "@/assets/icons/header_icons";
import useDebounce from "@/hooks/useDebounce";
import CategoryItem from "@/pages/Homepage/Components/CategoryItem";
import { useProductStore } from "@/store/useProductStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
type SearchFormValues = {
    keyword: string;
};
const SearchInput = () => {
    const { register, handleSubmit } = useForm<SearchFormValues>();
    const { handleSearchProductByKeyWord } = useProductStore();
    const [isFocused, setIsFocused] = useState(false);
    const [keyword, setKeyword] = useState('');
    const { products } = useProductStore();
    const debouncedSearch = useDebounce(keyword, 2000);

    const listCategotyName = products
        .filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()))
        .map(product => product.name);

    const listCategoryImage = products
        .filter(product =>
            product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
        .map(product => ({
            image: product.images[0]?.small_url,
            category: product.categories.name,
        }));

    const historySearch = localStorage.getItem('historySearch');

    const onSubmit = (word: string) => {
        if (word === "") return;
        localStorage.setItem('historySearch', word);
        handleSearchProductByKeyWord(word);
    };
    return (
        <form
            className="relative flex flex-1 items-center  rounded-lg border border-[#DDDDE3] ps-4"
            onSubmit={handleSubmit(() => onSubmit(keyword))}
        >
            <div className="flex w-full py-2.5">
                <img src={icon_search} alt="search" className="size-5" />
                <input
                    type="text"
                    className="ms-2 flex-1 border-r-1 border-[#DDDDE3] focus:outline-none"
                    placeholder="100% hàng thật"
                    {...register("keyword")}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
            <button
                type="submit"
                className="h-full cursor-pointer px-4 text-nowrap text-[#0A68FF] hover:bg-[#0A68FF66]"
            >
                Tìm kiếm
            </button>
            {isFocused && <div className="absolute left-0 top-12  bg-[#ffffff] w-full  z-20 ">
                <div className=" max-h-50 overflow-hidden">
                    {historySearch && <button onMouseDown={() => onSubmit(historySearch)} className="flex w-full gap-4 align-middle px-5 py-3  cursor-pointer hover:bg-[#27272a1f]"><img className="w-8 h-8" src={history_icon} alt="" /><span>{historySearch}</span> </button>}
                    <ul>
                        {listCategotyName.map((name) => (
                            <li key={name} className="hover:bg-[#27272a1f]">
                                <button
                                    type="button"
                                    onMouseDown={() => onSubmit(name)}
                                    className="flex gap-4 items-center px-5 py-3 cursor-pointer w-full text-left relative z-10"
                                >
                                    <img src={icon_search} alt="" className="w-5 h-5" />
                                    <span>{name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="grid grid-cols-4 gap-4">

                    {listCategoryImage.map((item) => (
                        <CategoryItem image={item.image} nameItem={item.category} key={item.category} />
                    ))}

                </div>
            </div>}

        </form>
    );
}
export default SearchInput;