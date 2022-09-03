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

export default function DeactivateModal({ handleClose }) {
    const user = useUser();
    const updateUser = useUserUpdate();

    const [activation, setActivation] = useState(null);

    const [loading, setLoading] = useState(null);

    const submitDeactivation = function () {
        setLoading(true);

        fetch("https://api.filesafety.co/v1/activations", {
            method: "DELETE",
            credentials: "include",
            headers: { ['Content-Type']: 'application/json' },
            body: JSON.stringify({
                Id: parseInt(activation),
            }),
        }).then((response) => response.json()).then((response) => {
            setActivation(null);
            setLoading(false);
            handleClose();
            updateUser();
        }).catch(() => {
            setActivation(null);
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
                            <Menu onChange={(event) => setActivation(event?.target?.value !== "null" ? event.target.value : null)}>
                                <MenuItem value={"null"}>Select a Activation</MenuItem>
                                {user?.Activations?.map?.((activation, index) => {
                                    return <MenuItem key={`0x${index}`} value={activation.Id}>[#{index + 1}] {activation.Address} {activation.Key ? `(${activation.Key})` : ""}</MenuItem>
                                })}
                            </Menu>
                            <Button disabled={!activation} onClick={submitDeactivation}>Deactivate</Button>
                            <Button buttonType={"danger"} onClick={handleClose}>Cancel</Button>
                        </>
                    }
                </Modal>
            </Backdrop>
        </>
    )
}
