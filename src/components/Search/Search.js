import React, {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import queryString from 'query-string';
import {getTasks} from "../../store/actions";
import {history} from "../../helpers/history";
import {formatDate} from "../../helpers/utils";
import Filters from "../Filters/Filters"
import {InputGroup, FormControl, Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';


function Search(props) {

    const [search, setSearch] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterParams, setFilterParams] = useState({});
    const inputEl = useRef(null);

    const handleAddFilters = (params) => {
        setFilterParams(params);
    };

    const getAllParams = () => {
        const params = {};
        const {status, sort, dates} = filterParams;
        if (Object.keys(filterParams).length) {
            filterParams.sort.value && (params.sort = sort.value);
            filterParams.status.value && (params.status = status.value);
            for (let key in dates) {
                if (dates[key]) {
                    params[key] = formatDate(dates[key].toISOString());
                }
            }
        }
        search && (params.search = search);
        return params;
    }

    const params = getAllParams();


    const handleSubmit = () => {
        props.getTasks(params);
    }

    useEffect(() => {
        inputEl.current.focus();
    }, []);


    useEffect(() => {
        const queryParams = queryString.stringify(params);
        history.replace({search: queryParams});
    }, [params]);


    const getCountOfFilters = () => {
        return params.search ? Object.keys(params).length - 1 : Object.keys(params).length;
    }

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
