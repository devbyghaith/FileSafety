import React, { useState } from 'react';

import Backdrop from '../../../backdrop';
import { Button, Input, Menu, MenuItem, Modal } from '../..';
import { useUser, useUserUpdate } from '../../../../providers/userProvider';
import { PulseLoader } from 'react-spinners';
import GenerateString from '../../../../utils/stringGenerator';

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

export default function ActivateModal({ handleClose }) {
    const user = useUser();
    const updateUser = useUserUpdate();

    const [product, setProduct] = useState(null);
    const [address, setAddress] = useState(null);
    const [license, setLicense] = useState(null);
    const [expires, setExpires] = useState(null);

    const [loading, setLoading] = useState(null);

    const submitActivation = function () {
        setLoading(true);

        fetch("https://api.filesafety.co/v1/activations", {
            method: 'POST',
            credentials: "include",
            headers: { ['Content-Type']: 'application/json' },
            body: JSON.stringify({
                ExpiresAt: expires,
                Product: product,
                Address: address,
                Key: license,
            }),
        }).then((response) => response.json()).then((response) => {
            setProduct(null);
            setAddress(null);
            setLicense(null);
            setExpires(null);
            setLoading(false);
            handleClose();
            updateUser();
        }).catch((error) => {
            setProduct(null);
            setAddress(null);
            setLicense(null);
            setExpires(null);
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
                                    return <MenuItem key={`0x${index}`} value={product.Id}>{product.Product}</MenuItem>
                                })}
                            </Menu>
                            <Input type="text" placeholder="Address" onKeyUp={(event) => setAddress(event.target.value ? event.target.value : null)} />
                            <Input type="text" placeholder="License" onDoubleClick={(event) => {
                                event.target.value = GenerateString(12);
                                setLicense(event.target.value);
                            }} onKeyUp={(event) => setLicense(event.target.value ? event.target.value : null)} />
                            <Input type="date" placeholder="Expiration Date" onChange={(event) => setExpires(event.target.value ? event.target.value : null)} />
                            <Button disabled={!address?.length || !product} onClick={submitActivation}>Activate</Button>
                            <Button buttonType={"danger"} onClick={handleClose}>Cancel</Button>
                        </>
                    }
                </Modal>
            </Backdrop>
        </>
    )
}
