import React, { useState } from "react";
import ReactDOM from "react-dom";

import Feature from "./components/Feature";
import Loading from "./components/Loading";
import Preview from "./components/Preview";
import Search from "./components/Search";
import Title from "./components/Title";

const App = () => {
  const [searchResults, setSearchResults] = useState({ info: {}, records: [] });
  const [featuredResult, setFeaturedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app">
      <Title />
      <Search setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
      <Preview
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setFeaturedResults={setFeaturedResult}
        setIsLoading={setIsLoading}
      />
      <Feature featuredResult={featuredResult} />
      {isLoading ? <Loading /> : null}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
