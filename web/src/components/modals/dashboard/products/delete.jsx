import React, { useState } from 'react';

import Backdrop from '../../../backdrop';
import { Button, Menu, MenuItem, Modal } from '../..';
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

export default function DeleteProductModal({ handleClose }) {
    const user = useUser();
    const updateUser = useUserUpdate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(null);

    const submitCreation = function () {
        setLoading(true);

        fetch("https://api.filesafety.co/v1/products", {
            method: 'DELETE',
            credentials: "include",
            headers: { ['Content-Type']: 'application/json' },
            body: JSON.stringify({
                Id: product,
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
                            <Menu onChange={(event) => setProduct(event?.target?.value !== "null" ? event.target.value : null)}>
                                <MenuItem value={"null"}>Select a Product</MenuItem>
                                {user?.Products?.map?.((product, index) => {
                                    return <MenuItem key={`0x${index}`} value={product.Id}>[#{index + 1}] {product.Product}</MenuItem>
                                })}
                            </Menu>
                            <Button disabled={!product} onClick={submitCreation}>Delete Product</Button>
                            <Button buttonType={"danger"} onClick={handleClose}>Cancel</Button>
                        </>
                    }
                </Modal>
            </Backdrop>
        </>
    )
}
