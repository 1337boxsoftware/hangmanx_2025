import React from 'react'
import "./Search.css"

const generateSearch = (status) => {
    if(status){
        return <div className="srch srch--lrg srch--prmry clr--rd flx--mdl box--pos-abs-top">searching..</div>
    }
    return <div className="vsblty--hdn"></div>
}

const Search = (props) => generateSearch(props.status) 

export default Search