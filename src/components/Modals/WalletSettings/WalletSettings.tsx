import cl from './WalletSettings.module.scss'
import {FC, useState} from "react";
import {validatedParse} from "../../../utils/validatedParse.ts";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {useGetWalletGoalsQuery, useUpdateWalletSettingsMutation} from "../../../store/api/walletApi.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import {RiskLevel} from "../../../models/enums/RiskLevel.ts";
import Button from "../../UI/Button/Button.tsx";
import {Input, Modal, Typography} from "@mui/material";
import seif from '../../../assets/seif.png'

interface WalletSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    walletId?: number,
    capital?: number,
    goalId?: number,
    riskLevel?: number,
    sharePurchaseLimit?: number
}

const WalletSettings: FC<WalletSettingsProps> = (
    {
        isOpen,
        onClose,
        walletId,
        capital,
        goalId,
        riskLevel,
        sharePurchaseLimit
    }) => {
    const [inputCapital, setCapital] = useState<number>(capital ? capital : 0);
    const [inputGoalId, setGoalId] = useState<number>(goalId ? goalId : 0);
    const [inputRiskLevel, setRiskLevel] = useState<number>(riskLevel ? riskLevel : 0)
    const [inputSharePurchaseLimit, setSharePurchaseLimit] = useState<number>(sharePurchaseLimit ? sharePurchaseLimit : 0);
    const {data: goals, isLoading: goalsLoading} = useGetWalletGoalsQuery();
    const [updateWalletSettings, {isLoading: updateWalletSettingsLoading}] = useUpdateWalletSettingsMutation();

    const handleSaveWalletSettings = async () => {
        await updateWalletSettings({walletId: walletId!, capital: inputCapital, goalId: inputGoalId, riskLevel: inputRiskLevel, sharePurchaseLimit: inputSharePurchaseLimit});
        onClose();
    }

    if (goalsLoading || updateWalletSettingsLoading) {
        return <Loader/>
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div className={cl.container}>
                <img src={seif} alt="" height='400vh'/>
                <div className={cl.walletSettings}>
                    <h2>Редактирование данных</h2>
                    <Typography
                        variant="body2"
                        sx={{mb: 1, fontWeight: 500}}
                    >
                        Капитал
                    </Typography>
                    <Input
                        value={inputCapital!}
                        onChange={(event) =>
                            setCapital(validatedParse(event.target.value, parseFloat))}
                    />
                    <Typography
                        variant="body2"
                        sx={{mb: 1, fontWeight: 500}}
                    >
                        Максимум одной акции
                    </Typography>
                    <Input
                        value={inputSharePurchaseLimit!}
                        onChange={(event) =>
                            setSharePurchaseLimit(validatedParse(event.target.value, parseInt))}
                    />
                    <FormControl sx={{width: '100%', marginTop: 2, fontSize: '14px'}}>
                        <InputLabel id="goal">Цель</InputLabel>
                        <Select
                            labelId="goal"
                            id="goal"
                            value={inputGoalId?.toString()}
                            onChange={(event: SelectChangeEvent) => setGoalId(validatedParse(event.target.value, parseInt))}
                        >
                            {
                                goals?.map((goal) =>
                                    <MenuItem key={goal.id} value={goal.id}>
                                        {goal.name}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{width: '100%', marginTop: 2, fontSize: '14px'}}>
                        <InputLabel id="riskLevel">Уровень риска</InputLabel>
                        <Select
                            labelId="riskLevel"
                            id="riskLevel"
                            value={inputRiskLevel?.toString()}
                            onChange={(event: SelectChangeEvent) => setRiskLevel(validatedParse(event.target.value, parseInt))}
                        >
                            {
                                RiskLevel?.map((risk) =>
                                    <MenuItem key={risk.id} value={risk.id}>
                                        {risk.name}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <Button onClick={handleSaveWalletSettings}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default WalletSettings;