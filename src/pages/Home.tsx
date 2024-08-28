import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebase";

interface Pizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

const Home = () => {
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  // const [sortType, setSortType] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "pizzas");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const pizzas: Pizza[] = Object.values(data);
        setItems(pizzas);
        setIsLoading(false);
      } else {
        alert("error");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="conteiner">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)}/>
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
