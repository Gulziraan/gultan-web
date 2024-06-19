import cl from './Wallets.module.scss'
import WalletCart from "../../components/WalletCart/WalletCart.tsx";
import {useAddWalletMutation, useGetWalletsQuery} from "../../store/api/walletApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import Slider from "react-slick";
import ArrowRight from "../../components/UI/Icons/ArrowRight.tsx";
import ArrowLeft from "../../components/UI/Icons/ArrowLeft.tsx";
import {useEffect, useRef, useState} from "react";
import seif from '../../assets/seif.png'
import {Input, Typography} from "@mui/material";
import Banner from "../../components/Banner/Banner.tsx";
import useModal from "../../hooks/useModal.ts";
import SuccessAdded from "../../components/Modals/SuccessAdded/SuccessAdded.tsx";

const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const Wallets = () => {
    const {data: wallets, isLoading} = useGetWalletsQuery();
    const slider = useRef<Slider>(null);
    const [newWallet, setNewWallet] = useState('')
    const [addWallet, {isLoading: addWalletLoading, isSuccess, reset}] = useAddWalletMutation();
    const successAddedModal = useModal();

    useEffect(() => {
        if (isSuccess) {
            successAddedModal.openModal()
            reset();
        }
    }, [isSuccess, reset, successAddedModal]);

    const handleSave = async () => {
        await addWallet(newWallet);
        setNewWallet('')
    }

    if (isLoading || addWalletLoading) {
        return <Loader/>
    }

    return (
        <div>
            <Banner/>
            <div className={cl.wallets}>
                {
                    wallets?.length
                        ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <ArrowLeft onClick={() => slider?.current?.slickPrev()}/>
                            <div style={{width: '55vw'}}>
                                <Slider {...settings} ref={slider}>
                                    {
                                        wallets?.map((wallet, index) => {
                                            return (
                                                <WalletCart
                                                    goal={wallet.goal?.name}
                                                    key={index}
                                                    id={wallet.id}
                                                    name={wallet.name}
                                                    totalProfit={wallet.profit}
                                                    createdAt={wallet.createdAt}
                                                />
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                            <ArrowRight onClick={() => slider?.current?.slickNext()}/>
                        </div>
                        : null
                }

                <div className={cl.newWallet}>
                    <img src={seif} alt='' height='400vh'/>
                    <div className={cl.form}>
                        <h2>
                            Создай новый кошелек
                        </h2>
                        <Typography
                            variant="body2"
                            sx={{mb: 1, fontWeight: 500}}
                        >
                            Название
                        </Typography>
                        <Input
                            value={newWallet}
                            onChange={(event) => setNewWallet(event.target.value)}
                        />
                        <button onClick={handleSave}>
                            Создать
                        </button>
                    </div>
                </div>
            </div>
            <SuccessAdded open={successAddedModal.isOpen} onClose={successAddedModal.closeModal}/>
        </div>

    );
};

export default Wallets;