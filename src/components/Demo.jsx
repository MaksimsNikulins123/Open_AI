import { useState, useEffect } from "react";

import { copy, linkIcon, loader, remove, tick } from '../assets';

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    length: 3,
    summary: '',
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("")

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
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
      
      const hasSimilarElement = allArticles.some((item) => item.url === newArticle.url);
      const updatedAllArticles = hasSimilarElement ? [...allArticles] : [newArticle, ...allArticles];
      
   
      setArticle(newArticle);
      setAllArticles(updatedAllArticles)

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))

    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }
  const handleRemoveArticle = (index) => {
    // console.log(article, index)
    // const people = [
    //   { id: 1, name: 'serdar' },
    //   { id: 5, name: 'alex' },
    //   { id: 300, name: 'brittany' }
    // ];
    
    // const idToRemove = 5;
    console.log(index)
    console.log(allArticles);
    // const array = [2, 5, 9];

    // console.log(array);
    
    // const index = array.indexOf(5);
 
      allArticles.splice(index, 1); // 2nd parameter means remove one item only
    
    
    // array = [2, 9]
    console.log(allArticles); 

    // console.log(filteredAllArticles);

//Output = [0, 1, 5, 12, 19, 20]
    // const filteredAllArticle = allArticles.filter((item) => item[0] !== index);
    // console.log(filteredAllArticle)
    // setAllArticles(filteredAllArticle);
    // localStorage.setItem('articles', JSON.stringify(filteredAllArticle))
    
    // [
    //   { id: 1, name: 'serdar' },
    //   { id: 300, name: 'brittany' }
    // [
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
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div 
              className="copy_btn"
              onClick={() => handleCopy(item.url)}
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
              <div className="remove_btn">
                <img
                  src={remove}
                  alt="remove_icon"
                  className="w-[80%] h-[80%] object-contain"
                  onClick={() => handleRemoveArticle(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        
        {isFetching 
        ? 
        (
          <img
            src={loader}
            alt="loader"
            className="w-20 h-20 object-contain"
          />
        ) 
        : 
        error 
        ? 
        (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) 
        : 
        (
          article.summary 
          && 
          (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>

          )
        )}
      </div>
    </section>
  )
}

export default Demo