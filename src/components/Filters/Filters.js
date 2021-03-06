import React, {useEffect, useState} from "react";
import {textCutter} from "../../helpers/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ButtonGroup, DropdownButton, Dropdown, Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";


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
    }

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

function Filters(props) {
    const {onClose, handleAddFilters, filterParams} = props;
    const [status, setStatus] = useState({
        value: ""
    })

    const [sort, setSort] = useState({
        value: ''
    });

    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });


    useEffect(() => {
        if (filterParams.sort) {
            const newSort = sortOptions.find(el => {
                return (el.value === filterParams.sort);
            });
            setSort(newSort);
        }
        if (filterParams.status) {
            const newStatus = statusOptions.find(el => {
                return (el.value === filterParams.status);
            });
            setStatus(newStatus);
        }

        for (let key in filterParams) {
            const newDates = dateOptions.find((el) => {
                return (el.value === key);
            });
            if (newDates) {
                setDates((dates) => {
                    return {
                        ...dates, ...{
                            [key]: new Date(filterParams[key])
                        }
                    };
                });
            }
        }

    }, [filterParams]);


    const handleChangeDate = (value, name) => {
        setDates({...dates, [name]: value});
    };


    const handleFilters = () => {
        const params = {};
        sort.value && (params.sort = sort.value);
        status.value && (params.status = status.value);
        for (let key in dates) {
            if (dates[key]) {
                params[key] = dates[key].toLocaleDateString();
            }
        }
        handleAddFilters(params);
        onClose();
    };


    const handleResetFilters = () => {
        setStatus({value: ""});
        setSort({value: ""});
        setDates({
            create_lte: null,
            create_gte: null,
            complete_lte: null,
            complete_gte: null
        });
    };

    return (
        <Modal
            show={true}
            onHide={onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Filters
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DropdownButton
                    as={ButtonGroup}
                    variant="outline-primary"
                    title={status.value === "" ? "Status" : status.label}
                    id="input-group-dropdown-1"
                >
                    {
                        statusOptions.map((option, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}
                                    active={status.value === option.value}
                                    onClick={() => setStatus(option)}
                                >
                                    {option.label}
                                </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
                <DropdownButton
                    as={ButtonGroup}
                    variant="outline-primary"
                    title={sort.value === "" ? "Sort" : textCutter(sort.label, 6)}
                    id="input-group-dropdown-2"
                >
                    {
                        sortOptions.map((option, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}
                                    active={sort.value === option.value}
                                    onClick={() => setSort(option)}
                                >
                                    {option.label}
                                </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
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
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleFilters}
                    variant='success'
                >
                    Add
                </Button>
                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleResetFilters}
                >
                    Reset
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

Filters.propTypes = {
    onClose: PropTypes.func.isRequired,
    handleAddFilters: PropTypes.func.isRequired,
    filterParams: PropTypes.object.isRequired,
};

export default Filters;