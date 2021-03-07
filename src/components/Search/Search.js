import React, {useState} from "react";
import {connect} from "react-redux";
import {InputGroup, FormControl, DropdownButton, Dropdown, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {textCutter} from "../../helpers/utils";
import { formatDate } from "../../helpers/utils";
import {getTasks} from "../../store/actions";


const statusOptions = [
    {
        label: "All",
        value: ""
    },
    {
        label: "Done",
        value: "done"
    },
    {
        label: "Active",
        value: "active"
    },

];


const sortOptions = [
    {
        label: ' All ',
        value: ''
    },
    {
        label: ' A-Z ',
        value: 'a-z'
    },
    {
        label: ' Z-A ',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion date newest',
        value: 'completion_date_newest'
    },
    {
        label: 'Completion date oldest',
        value: 'completion_date_oldest'
    }
];

const dateOptions = [
    {
        label: 'Created before',
        value: 'create_lte'
    },
    {
        label: 'Created after',
        value: 'create_gte'
    },
    {
        label: 'Complete before',
        value: 'complete_lte'
    },
    {
        label: 'Complete after',
        value: 'complete_gte'
    }
];


function Search(props) {
    const [status, setStatus] = useState({
        value: ""
    })

    const [sort, setSort] = useState({
        value: ''
    });
    const [search, setSearch] = useState("");

    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });

    const handleChangeDate = (value, name) => {
        setDates({...dates, [name]: value})

    }
    const handleSubmit = () => {
        const params = {};
        search && (params.search =search);
        sort.value && (params.sort =sort.value);
        status.value && (params.status =status.value);
        for (let key in dates) {
            if (dates[key]) {
                params[key] = formatDate(dates[key].toISOString());
            }
        }
        props.getTasks(params);
    }

    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title={status.value === "" ? "Status" : status.label}
                    id="input-group-dropdown-1"
                >
                    {
                        statusOptions.map((option, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}
                                    active={status.value === option.value}
                                    onClick={
                                        () => setStatus(option)
                                    }
                                >
                                    {option.label}
                                </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>

                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title={sort.value === "" ? "Sort" : textCutter(sort.label, 6)}
                    id="input-group-dropdown-2"
                >
                    {
                        sortOptions.map((option, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}
                                    active={sort.value === option.value}
                                    onClick={
                                        () => setSort(option)
                                    }

                                >
                                    {option.label}
                                </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
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
            <div>
                {
                    dateOptions.map((option, index) => {
                        return (
                            <div key={index}>
                                <label htmlFor={index}>{option.label}</label>
                                <DatePicker
                                    id={index}
                                    selected={dates[option.value]}
                                    onChange={(value) => handleChangeDate(value, option.value)}
                                />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
const mapDispatchToProps={
    getTasks,
}
export default connect(null,mapDispatchToProps)(Search);
