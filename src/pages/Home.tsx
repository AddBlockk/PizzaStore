import { useContext, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebase";
import { SearchContext } from "../App";

interface Pizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  category: number;
  rating: number;
}

const Home = () => {
  const { searchValue } = useContext(SearchContext) as {
    searchValue: string;
  };
  const [allItems, setAllItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [filteredItems, setFilteredItems] = useState<Pizza[]>([]);
  const [sortedItems, setSortedItems] = useState<Pizza[]>([]);
  const [sortType, setSortType] = useState(0);

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
        setFilteredItems(pizzas);
        setSortedItems(pizzas);
        setIsLoading(false);
      } else {
        alert("error");
      }
    };
    fetchData();
  }, [categoryId]);

  useEffect(() => {
    if (categoryId === 0) {
      setFilteredItems(allItems);
    } else {
      setFilteredItems(allItems.filter((item) => item.category === categoryId));
    }
  }, [categoryId, allItems]);

  useEffect(() => {
    const sortedItems = [...filteredItems].sort((a, b) => {
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
    });
    setSortedItems(sortedItems);
  }, [sortType, filteredItems]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = sortedItems
    .filter((obj) => {
      if (
        obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="conteiner">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
