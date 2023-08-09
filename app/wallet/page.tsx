"use client"

import React, { useState, useEffect, useMemo } from "react";
import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk';
import { ZeroDevWeb3Auth } from '@zerodevapp/web3auth';
import Cookies from "universal-cookie";
import { verifyJwtToken } from "../libs/auth";
import { useRouter } from "next/navigation";


export default function RpcProviderExample() {
    const defaultProjectId = '87dd7e58-d586-41bc-bcb8-f561fceb0fff';
    const [jwt, setJWT] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const userId = window.crypto.getRandomValues(new Uint32Array(4)).join('-')

    const resetJWT = () => {
        fetch(`https://jwt-issuer.onrender.com/create-jwt/${userId}`).then(response => {
            response.text().then(setJWT)
        })
    }

    useEffect(() => {
        // THIS IS DEMO CODE TO CREATE A JWT, YOU WOULD HAVE YOUR OWN WAY TO GET YOUR JWT
        resetJWT()
    }, [])

    const setWallet = async (provider: any) => {
        const signer = await getZeroDevSigner({
            projectId: defaultProjectId,
            owner: await getRPCProviderOwner(provider)
        })
        setAddress(await signer.getAddress())
    }

    const zeroDevWeb3Auth = useMemo(() => {
        const instance = new ZeroDevWeb3Auth([defaultProjectId])
        instance.init({
            onConnect: async () => {
                setLoading(true)
                setWallet(zeroDevWeb3Auth.provider)
                setLoading(false)
            }
        })
        return instance
    }, [])

    const disconnect = async () => {
        await zeroDevWeb3Auth.logout()
        setAddress('')
        resetJWT()
    }

    const handleClick = async () => {
        setLoading(true)
        zeroDevWeb3Auth.connect('jwt', { jwt }).then((provider: any) => {
            setWallet(provider)
        }).finally(() => {
            setLoading(false)
        })
    }

    const connected = !!address
    return (
        <div>
            {connected &&
                <div>
                    <label>Wallet: {address}</label>
                </div>
            }
            <div>
                {!connected && <button onClick={handleClick} disabled={loading || !jwt}>{loading ? 'loading...' : 'Create Wallet with JWT'}</button>}
                {connected &&
                    <button onClick={disconnect} disabled={loading}>Disconnect</button>
                }
            </div>
        </div>
    )
}