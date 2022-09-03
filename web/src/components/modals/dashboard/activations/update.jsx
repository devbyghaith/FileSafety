import React, { useEffect, useState } from 'react';

import Backdrop from '../../../backdrop';
import { Button, Input, Menu, MenuItem, Modal } from '../..';
import { useUser, useUserUpdate } from '../../../../providers/userProvider';
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

export default function UpdateModal({ handleClose }) {
    const user = useUser();
    const updateUser = useUserUpdate();

    const [activation, setActivation] = useState(null);
    const [address, setAddress] = useState('');
    const [license, setLicense] = useState('');
    const [expires, setExpires] = useState('');

    const [loading, setLoading] = useState(null);

    const submitUpdate = function () {
        setLoading(true);

        fetch("https://api.filesafety.co/v1/activations", {
            method: 'PATCH',
            credentials: "include",
            headers: { ['Content-Type']: 'application/json' },
            body: JSON.stringify({
                Id: activation.Id,
                ExpiresAt: expires ? new Date(expires).toISOString().slice(0, 19).replace('T', ' ') : null,
                Address: address || activation.Address,
                Key: license || activation.Key,
            }),
        }).then((response) => response.json()).then((response) => {
            setActivation(null);
            setAddress(null);
            setLicense(null);
            setExpires(null);
            setLoading(false);
            handleClose();
            updateUser();
        }).catch((error) => {
            setActivation(null);
            setAddress(null);
            setLicense(null);
            setExpires(null);
            setLoading(false);
            handleClose();
            updateUser();
        });
    };

    useEffect(() => {
        if (activation?.ExpiresAt) setExpires(activation.ExpiresAt);
        if (activation?.Address) setAddress(activation.Address);
        if (activation?.Key) setLicense(activation.Key);
    }, [activation]);

    return (
        <>
            <Backdrop onClick={handleClose}>
                <Modal
                    onClick={(event) => event.stopPropagation()}
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {
                        loading
                        ? <>Loading...</>
                        : <>
                            <Menu onChange={(event) => setActivation(event?.target?.value !== "null" ? user?.Activations?.find?.((_) => _.Id == event.target.value) : null)}>
                                <MenuItem value={"null"}>Select a Activation</MenuItem>
                                {user?.Activations?.map?.((activation, index) => {
                                    return <MenuItem key={`0x${index}`} value={activation.Id}>[#{index + 1}] {activation.Address} {activation.Key ? `(${activation.Key})` : ""}</MenuItem>
                                })}
                            </Menu>
                            {
                                activation && <>
                                    <Input type="text" placeholder="Address" value={address} onChange={(event) => setAddress(event.target.value ? event.target.value : null)} />
                                    <Input type="text" placeholder="License" onDoubleClick={(event) => {
                                        event.target.value = GenerateString(12);
                                        setLicense(event.target.value);
                                    }} value={license} onChange={(event) => setLicense(event.target.value ? event.target.value : null)} />
                                    <Input type="date" placeholder="Expiration Date" value={activation.ExpiresAt ? new Date(activation.ExpiresAt).toLocaleDateString() : expires} onChange={(event) => setExpires(event.target.value ? event.target.value : null)} />
                                </>
                            }
                            <Button disabled={!activation} onClick={submitUpdate}>Update</Button>
                            <Button buttonType={"danger"} onClick={handleClose}>Cancel</Button>
                        </>
                    }
                </Modal>
            </Backdrop>
        </>
    )
}
