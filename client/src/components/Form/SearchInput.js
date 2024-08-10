import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../../css/search.css";
import './Search.css'
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="herosearch">
      <div className="herosearchform">
        <form onSubmit={handleSubmit} style={{display:"flex",justifyContent:'center',width:'100%'}}>
          {/* <div className="hero__search__categories">
            All Categories
            <span className="arrow_carrot-down"></span>
          </div> */}
          <input
            type="text"
            id="inp"
            placeholder="What do you need?"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            width={'100%'}
            // style={{padding:20,paddingInline:'30%'}}
          />
          <button type="submit" className="site-btn">
            {/* <FaSearch color="white"/> */}
            SEARCH
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
