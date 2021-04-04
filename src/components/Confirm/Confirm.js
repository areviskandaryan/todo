import React from "react";
import PropTypes from "prop-types";
import {Modal, Button} from "react-bootstrap";


function Confirm(props) {
    const {onClose, onConfirm, count} = props;

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
                    Are you sure to remove {count} task{count > 1 ? "s" : ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button
                    onClick={onConfirm}
                    variant='danger'
                >
                    Delete
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>

    )
}

Confirm.propTypes = {
    onClose: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default Confirm;