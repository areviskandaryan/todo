import React, {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import queryString from 'query-string';
import {getTasks} from "../../store/actions";
import {history} from "../../helpers/history";
import Filters from "../Filters/Filters";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {InputGroup, FormControl, Button} from "react-bootstrap";


function Search(props) {

    const [search, setSearch] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterParams, setFilterParams] = useState(null);
    const inputEl = useRef(null);

    const handleAddFilters = (params) => {
        setFilterParams(params);
    };

    const getAllParams = () => {
        const allParams = filterParams ? {...filterParams} : {};
        search && (allParams.search = search);
        return allParams;
    };

    const allParams = getAllParams();


    const handleSubmit = () => {
        props.getTasks(allParams);
    };

    useEffect(() => {
        inputEl.current.focus();
    }, []);


    useEffect(() => {
        const queryParams = queryString.stringify(allParams);
        history.replace({search: queryParams});
    }, [allParams]);


    const getCountOfFilters = () => {
        const countOfFilters = (filterParams === null) ? "" : Object.keys(filterParams).length;
        return countOfFilters;
    };

    const toggleFilterModal = () => {
        setShowFilterModal(!showFilterModal);
    };

    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    ref = {inputEl}
                />

                <InputGroup.Append>
                    <Button
                        variant="primary"
                        onClick={toggleFilterModal}
                    >
                        <FontAwesomeIcon icon={faFilter}/>
                        <span>{getCountOfFilters()}</span>
                    </Button>
                </InputGroup.Append>
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={handleSubmit}
                        style={{width: "100px"}}
                    >
                        Search
                    </Button>
                </InputGroup.Append>
            </InputGroup>

            {
                showFilterModal &&
                <Filters
                    onClose={toggleFilterModal}
                    handleAddFilters={handleAddFilters}
                    filterParams={filterParams}

                />
            }
        </div>
    )
}

const mapDispatchToProps = {
    getTasks,
}
export default connect(null, mapDispatchToProps)(Search);
