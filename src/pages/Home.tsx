import { useContext, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebase";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import { FilterState, Pizza } from "../types/interfaces";

const Home = () => {
  const dispatch = useDispatch();

  const { categoryId, sort } = useSelector(
    (state: FilterState) => state.filter
  );
  const sortType = sort;

  const { searchValue } = useContext(SearchContext) as {
    searchValue: string;
  };
  const [allItems, setAllItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const db = getDatabase(app);
      const dbRef = ref(db, "pizzas");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const pizzas: Pizza[] = Object.values(data);
        setAllItems(pizzas);
        setIsLoading(false);
      } else {
        alert("error");
      }
    };
    fetchData();
  }, []);

  const filteredAndSortedItems = allItems
    .filter((item) => {
      if (categoryId === 0 || item.category === categoryId) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      switch (sortType) {
        case 0:
          return b.rating - a.rating;
        case 1:
          return b.price - a.price;
        case 2:
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    })
    .filter((obj) => {
      if (
        obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      ) {
        return true;
      }
      return false;
    });

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = filteredAndSortedItems.map((obj) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));

  return (
    <div className="conteiner">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
