import React, {Component} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {v4 as uuidv4} from "uuid";


class InputDatas extends Component {
    state = {
        title: "",
        description: "",
    }

    handleChange = ({target: {value, name}}) => {
        this.setState({
            [name]: value,
        })
    }

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            // this.handleAdd();
        }
    }

    handleSubmit = () => {
        const { onAdd } = this.props;
        const title = this.state.title.trim();
        const  description = this.state.description.trim();
        if (title.trim()) {
            const newTask = {
                _id: uuidv4(),
                title,
                description,
            };
            onAdd(newTask);
            this.setState({
                title: "",
                description: "",
            });
        }
    }

    render() {
        const { disabled } = this.props;
        const { title, description } = this.state;

        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    disabled={disabled}
                />
                <FormControl
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={this.handleSubmit}
                        disabled={disabled}
                    >
                        Add
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

}

export default InputDatas