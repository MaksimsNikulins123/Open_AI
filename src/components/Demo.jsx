import { useState, useEffect } from "react";

import { copy, linkIcon, loader, remove, tick } from '../assets';

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

  const [article, setArticle] = useState({
    url: '',
    length: 3,
    summary: '',
  });

  const [allArticles, setAllAricles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if (articlesFromLocalStorage) {
      setAllAricles(articlesFromLocalStorage)
    }
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { data } = await getSummary({
      articleUrl: article.url,
      articleLength: article.length,

    });

    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary
      };

      const updateAllArticles = [
        newArticle,
        ...allArticles
      ];

      setArticle(newArticle);
      setAllAricles(updateAllArticles)

      localStorage.setItem('articles', JSON.stringify(updateAllArticles))

    }
  }





  return (
    <section className="mt-12 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({
              ...article,
              url: e.target.value
            })}
            required
            className="url_input peer-focus:border-gray-700 peer-focus:text-gray-700"
          />

          <button
            type="submit"
            className="submit_btn"
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
        <div className="flex justify-between items-center">
              <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn">
                <img 
                  src={copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p>
                {item.url}
              </p>
              
            </div>
            <div className="remove_btn">
                <img 
                  src={remove}
                  alt="remove_icon"
                  className="w-[80%] h-[80%] object-contain"
                  onClick={() => {alert('Delete')}}
                />
              </div>
        </div>
          ))}
        </div>
      </div>

      {/* Display Results */}

    </section>
  )
}

export default Demo