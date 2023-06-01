import React, { Fragment } from "react";
import { fetchQueryResultsFromTermAndValue } from "../api";

const Searchable = ({
  searchTerm,
  searchValue,
  setIsLoading,
  setSearchResults,
}) => {
  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromTermAndValue(
        searchTerm,
        searchValue
      );
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span className="content">
      <a href="#" onClick={handleClick}>
        {searchValue}
      </a>
    </span>
  );
};

const Feature = ({ featuredResult }) => {
  if (!featuredResult) {
    return <main id="feature"></main>;
  }

  const {
    title,
    dated,
    images,
    primaryimageurl,
    description,
    culture,
    style,
    technique,
    medium,
    dimensions,
    people,
    department,
    division,
    contact,
    creditline,
  } = featuredResult;

  const renderFacts = () => {
    const facts = [
      { name: "Title", value: title },
      { name: "Dated", value: dated },
      { name: "Culture", value: culture },
      { name: "Style", value: style },
      { name: "Technique", value: technique },
      { name: "Medium", value: medium },
      { name: "Dimensions", value: dimensions },
      { name: "Department", value: department },
      { name: "Description", value: description },
      { name: "Division", value: division },
      { name: "Contact", value: contact },
      { name: "Creditline", value: creditline },
    ];

    const peopleNames = people?.map((person) => person.displayname);
    const formattedPeople = peopleNames?.join(", ");

    if (formattedPeople) {
      facts.push({ name: "People", value: formattedPeople });
    }

    return facts.map((fact, index) => (
      <Fragment key={index}>
        <span className="title">{fact.name}</span>
        <span className="content">{fact.value}</span>
      </Fragment>
    ));
  };

  return (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title}</h3>
          <h4>{dated}</h4>
        </header>
        <section className="facts">{renderFacts()}</section>
        <section className="photos">
          {images && images.length > 0 && (
            <img src={primaryimageurl} alt="Something worthwhile" />
          )}
        </section>
      </div>
    </main>
  );
};

export default Feature;
