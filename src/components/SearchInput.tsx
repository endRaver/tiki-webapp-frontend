import {
  history_icon,
  icon_search,
  remove_history,
  search_input,
} from "@/assets/icons/header_icons";
// import useDebounce from "@/hooks/useDebounce";
// import CategoryItem from "@/pages/Homepage/Components/CategoryItem";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
type SearchFormValues = {
  keyword: string;
};
const SearchInput = () => {
  const { register, handleSubmit } = useForm<SearchFormValues>();
  const {
    handleSearchProductByKeyWord,
    handleGetAllProduct,
    handleGetAllProductPagination,
    resetProducts,
  } = useProductStore();
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");
  // const debouncedSearch = useDebounce(keyword, 2000);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await handleGetAllProduct();
      setProducts(products);
    };
    fetchProducts();
  }, [handleGetAllProduct]);

  const filteredProducts = useMemo(() => {
    if (isEmpty(products)) return [];

    return products
      .filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase()),
      )
      .map((product) => product.name);
  }, [products, keyword]);

  // const listCategoryImage = useMemo(() => {
  //   return products
  //     .filter((product) =>
  //       product.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  //     )
  //     .map((product) => ({
  //       image: product.images[0]?.small_url,
  //       category: product.categories.name,
  //     }));
  // }, [products, debouncedSearch]);

  const historySearch = localStorage.getItem("historySearch");

  const onSubmit = (word: string) => {
    if (word === "") {
      resetProducts();
      handleGetAllProductPagination();
      return;
    }
    localStorage.setItem("historySearch", word);
    handleSearchProductByKeyWord(word);
  };

  const liStyle =
    "flex w-full cursor-pointer relative items-center justify-start gap-2 px-4 align-middle hover:bg-[#27272a1f]";

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
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="h-full cursor-pointer px-4 text-nowrap text-[#0A68FF] hover:bg-[#0A68FF66]"
      >
        Tìm kiếm
      </button>
      {isFocused && (
        <div className="absolute top-12 left-0 z-20 w-full rounded-lg border border-gray-300 bg-white text-sm font-medium shadow-lg">
          <div className="overflow-y-auto">
            {historySearch && (
              <button
                onMouseDown={() => onSubmit(historySearch)}
                className={liStyle}
              >
                <img className="size-9" src={history_icon} alt="history_icon" />
                <p className="line-clamp-1 text-start">{historySearch}</p>
                <div
                  className="absolute top-1/2 right-2 size-5 -translate-y-1/2 cursor-pointer"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setKeyword("");
                    localStorage.removeItem("historySearch");
                  }}
                >
                  <img src={remove_history} alt="remove_history" />
                </div>
              </button>
            )}
            <ul>
              {filteredProducts.map(
                (name, index) =>
                  index < 5 && (
                    <li key={index}>
                      <button
                        type="button"
                        onMouseDown={() => onSubmit(name)}
                        className={liStyle}
                      >
                        <img
                          src={search_input}
                          alt="search_input"
                          className="size-9"
                        />
                        <span className="line-clamp-1 text-start">{name}</span>
                      </button>
                    </li>
                  ),
              )}
            </ul>
          </div>
          {/* <div className="grid grid-cols-4 gap-1">
            {listCategoryImage.map((item, index) => (
              <CategoryItem
                key={index}
                image={item.image}
                nameItem={item.category}
              />
            ))}
          </div> */}
        </div>
      )}
    </form>
  );
};
export default SearchInput;
