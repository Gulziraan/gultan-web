import {BaseDto} from "./BaseDto.ts";
import {GoalDto} from "./GoalDto.ts";

export interface WalletDto extends BaseDto{
    name: string,
    riskLevel: number,
    capital: number,
    goalId: number
    goal: GoalDto
    createdAt: Date
    sharePurchaseLimit: number,
    profit: number
}
