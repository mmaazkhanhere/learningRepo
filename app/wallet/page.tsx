"use client"

import React, { useState, useEffect, useMemo } from "react";
import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk';
import { ZeroDevWeb3Auth } from '@zerodevapp/web3auth';
import Cookies from "universal-cookie";
import { verifyJwtToken } from "../libs/auth";
import { useRouter } from "next/navigation";

export default function RpcProviderExample() {
    const [loading, setLoading] = useState(false);
    const defaultProjectId = '87dd7e58-d586-41bc-bcb8-f561fceb0fff';
    const cookies = new Cookies();
    const address = cookies.get('address');

    const [publicAddress, setPublicAddress] = useState<string>(address);

    const route = useRouter();

    const setWallet = async (provider: any) => {
        try {
            const signer = await getZeroDevSigner({
                projectId: defaultProjectId,
                owner: await getRPCProviderOwner(provider),
            });
            const walletAddress = await signer.getAddress();
            setPublicAddress(walletAddress);
        } catch (error) {
            console.error("Error setting wallet:", error);
        }
    };

    const zeroDevWeb3Auth = useMemo(() => {
        const instance = new ZeroDevWeb3Auth([defaultProjectId]);
        instance.init({
            onConnect: async () => {
                setLoading(true);
                setWallet(zeroDevWeb3Auth.provider);
                setLoading(false);
            },
        });
        return instance;
    }, []);

    const disconnect = async () => {
        const cookies = new Cookies();
        cookies.set("token", null, { path: "/", expires: new Date(0) });
        setPublicAddress('');
    };

    const handleClick = async () => {
        setLoading(true);
        const token = cookies.get("token") ?? null;

        if (token) {
            try {
                const isTokenVerified = await verifyJwtToken(token);

                if (isTokenVerified) {
                    zeroDevWeb3Auth.connect('jwt', { jwt: token }).then((provider: any) => {
                        setWallet(provider);
                    });
                } else {
                    route.push("/login");
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                route.push('/login');
            }
        } else {
            route.push("/login");
        }
        setLoading(false);
    };

    const connected = !!publicAddress;

    return (
        <div>
            {connected &&
                <div>
                    <label className="text-xl font-bold">Wallet: <span className="text-lg">{address}</span></label>
                </div>
            }
            <div>
                {
                    !connected &&
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-400 rounded-lg"
                    >
                        {loading ? 'loading...' : 'Create Wallet with JWT'}
                    </button>}
                {
                    connected &&
                    <button
                        onClick={disconnect}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-400 rounded-lg"
                    >
                        Disconnect
                    </button>
                }
            </div>
        </div>
    );
}
