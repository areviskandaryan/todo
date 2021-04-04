import React, {useState, useEffect, useRef, useMemo} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import queryString from 'query-string';
import {getTasks} from "../../store/actions";
import {history} from "../../helpers/history";
import Filters from "../Filters/Filters";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {getQuery} from "../../helpers/utils";


function Search(props) {

    const [search, setSearch] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterParams, setFilterParams] = useState({});
    const inputEl = useRef(null);

    const handleAddFilters = (params) => {
        setFilterParams(params);
    };

    const getAllParams = (filterParams) => {
        const params = {...filterParams};
        search && (params.search = search);
        return params;
    };

    // eslint-disable-next-line
    const params = useMemo(() => getAllParams(filterParams), [filterParams, search]);

    const handleSubmit = () => {
        props.getTasks(params);
    };

    useEffect(() => {
        inputEl.current.focus();
    }, []);


    const pathName = props.location.pathname;
    useEffect(() => {
        const query = getQuery(params);
        history.push(`${pathName}?${query}`);
    }, [params,pathName]);


    const urlQuery = props.location.search;
    useEffect(() => {
        if (urlQuery) {
            const query = urlQuery.slice(1);
            const parsedQueryToObject = queryString.parse(query);
            if (parsedQueryToObject.search) {
                const {search, ...rest} = parsedQueryToObject;
                setSearch(parsedQueryToObject.search);
                setFilterParams(rest);
            } else {
                setFilterParams(parsedQueryToObject);
            }
        }
    }, [urlQuery]);

    const getCountOfFilters = (filterParams) => {
        return Object.keys(filterParams).length;
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
                    ref={inputEl}
                />

                <InputGroup.Append>
                    <Button
                        variant="primary"
                        onClick={toggleFilterModal}
                    >
                        <FontAwesomeIcon icon={faFilter}/>
                        <span>{getCountOfFilters(filterParams)}</span>
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
    getTasks
}
export default connect(null, mapDispatchToProps)(withRouter(Search));
