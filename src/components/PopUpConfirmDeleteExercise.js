import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react';

import { TrashIcon } from '@primer/octicons-react';

function PopUpConfirmDeleteExercise({ handleDelete }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleConfirmDelete = () => {
        handleDelete();
        onClose();
    };

    return (
        <>
            <IconButton aria-label="Delete" icon={<TrashIcon />} className="item-delete-btn" onClick={onOpen} mb="5px">
                Delete
            </IconButton>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Do you want to delete this exercise?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Are you sure you want to delete this exercise?</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleConfirmDelete}>
                            {' '}
                            Confirm
                        </Button>
                        <Button colorScheme="red" ml={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default PopUpConfirmDeleteExercise;
