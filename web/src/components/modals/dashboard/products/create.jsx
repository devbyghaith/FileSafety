import React, { useState } from 'react';

import Backdrop from '../../../backdrop';
import { Button, Input, Menu, MenuItem, Modal } from '../..';
import { useUser, useUserUpdate } from '../../../../providers/userProvider';
import { PulseLoader } from 'react-spinners';

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },

    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 100,
            stiffness: 500,
        }
    },

    exit: { 
        y: "-100vh",
        opacity: 0
    }
};

export default function CreateProductModal({ handleClose }) {
    const user = useUser();
    const updateUser = useUserUpdate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(null);

    const submitCreation = function () {
        setLoading(true);

        fetch("https://api.filesafety.co/v1/products", {
            method: 'POST',
            credentials: "include",
            headers: { ['Content-Type']: 'application/json' },
            body: JSON.stringify({
                Name: product,
            }),
        }).then((response) => response.json()).then((response) => {
            setProduct(null);
            setLoading(false);
            handleClose();
            updateUser();
        }).catch((error) => {
            setProduct(null);
            setLoading(false);
            handleClose();
            updateUser();
        });
    };

    return (
        <>
            <Backdrop onClick={handleClose}>
                <Modal
                    align={loading}
                    onClick={(event) => event.stopPropagation()}
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {
                        loading
                        ? <PulseLoader color={"var(--colors-main)"} margin={"0.35rem"} size={"1.25rem"} />
                        : <>
                            <Input type="text" placeholder="Product Name" onKeyUp={(event) => setProduct(event.target.value ? event.target.value : null)} />
                            <Button disabled={!product} onClick={submitCreation}>Create Product</Button>
                            <Button buttonType={"danger"} onClick={handleClose}>Cancel</Button>
                        </>
                    }
                </Modal>
            </Backdrop>
        </>
    )
}
