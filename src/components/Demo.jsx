import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from '../assets';

// import { useLazyGetSummaryQuery } from "../services/article";

import axios from "axios";

const Demo = () => {
  
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  // const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();


const options = {
  method: 'GET',
  url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
  params: {
    url: 'https://time.com/6266679/musk-ai-open-letter/',
    length: '3'
  },
  headers: {
    'X-RapidAPI-Key': 'd55f7b8f51msh82c96da76eb7b11p10ddd4jsned82d13faa97',
    'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
  }
};

  const handleSubmit = async (e) => {

      e.preventDefault();
      // alert('Submited')
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }


    // const { data } = await getSummary({ 
    //   articleUrl: article.url,

    // });
// debugger
    // if(data?.summary) {
    //   const newArticle = {
    //     ...article,
    //     summary: data.summary
    //   };

    //   setArticle(newArticle);
      
    //   console.log(newArticle);
    // }
  }

  



  return (
    <section className="mt-16 w-full max-w-xl">
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
      </div>

      {/* Display Results */}

    </section>
  )
}

export default Demo