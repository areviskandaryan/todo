import React, {Component} from "react";
import {Button,  FormControl, InputGroup} from "react-bootstrap";


class InputDatas extends Component {

    render(){
        const {todo:{title,description}, onHandleCange, onHandleKeyDown, onAdd, disabled} = this.props;

        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={onHandleCange}
                    onKeyDown = {onHandleKeyDown}
                />
                <FormControl
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={onHandleCange}
                    onKeyDown = {onHandleKeyDown}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={onAdd}
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