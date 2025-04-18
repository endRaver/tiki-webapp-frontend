import { history_icon, icon_search } from "@/assets/icons/header_icons";
import useDebounce from "@/hooks/useDebounce";
import CategoryItem from "@/pages/Homepage/Components/CategoryItem";
import { useProductStore } from "@/store/useProductStore";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
type SearchFormValues = {
  keyword: string;
};
const SearchInput = () => {
  const { register, handleSubmit } = useForm<SearchFormValues>();
  const { handleSearchProductByKeyWord,handleFetchAllProduct } = useProductStore();
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { products } = useProductStore();
  const debouncedSearch = useDebounce(keyword, 2000);

  const listCategoryName = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      )
      .map((product) => product.name);
  }, [products, keyword]);
  
  const listCategoryImage = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .map((product) => ({
        image: product.images[0]?.small_url,
        category: product.categories.name,
      }));
  }, [products, debouncedSearch]);

  const historySearch = localStorage.getItem("historySearch");

  const onSubmit = (word: string) => {
    if (word === ""){
        handleFetchAllProduct(undefined, true);
        return;
    } 
    localStorage.setItem("historySearch", word);
    handleSearchProductByKeyWord(word);
  };
  return (
    <form
      className="relative flex flex-1 items-center rounded-lg border border-[#DDDDE3] ps-4"
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
      {isFocused && (
        <div className="absolute top-12 left-0 z-20 w-full bg-[#ffffff] border border-gray-300 shadow-lg rounded-lg p-4">
          <div className="max-h-50 overflow-hidden">
            {historySearch && (
              <button
                onMouseDown={() => onSubmit(historySearch)}
                className="flex w-full cursor-pointer gap-4 px-5 py-3 align-middle hover:bg-[#27272a1f]"
              >
                <img className="h-8 w-8" src={history_icon} alt="" />
                <span>{historySearch}</span>{" "}
              </button>
            )}
            <ul>
              {listCategoryName.map((name) => (
                <li key={name} className="hover:bg-[#27272a1f]">
                  <button
                    type="button"
                    onMouseDown={() => onSubmit(name)}
                    className="relative z-10 flex w-full cursor-pointer items-center gap-4 px-5 py-3 text-left"
                  >
                    <img src={icon_search} alt="" className="h-5 w-5" />
                    <span>{name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {listCategoryImage.map((item, index) => (
              <CategoryItem
                key={index}
                image={item.image}
                nameItem={item.category}
              />
            ))}
          </div>
        </div>
      )}
    </form>
  );
};
export default SearchInput;
