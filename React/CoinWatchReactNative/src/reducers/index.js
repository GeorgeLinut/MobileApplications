import AuthReducer from './AuthReducer';
import CoinReducer from './CoinReducer';
import CoinDetailsReducer from './CoinDetailsReducer';
import MyCoinsFormReducer from './MyCoinsFormReducer';
import MyCoinsReducer from './MyCoinsReducer';
import InvestmentReducer from './InvestmentReducer';

export default {
    auth: AuthReducer,
    coins: CoinReducer,
    coinDetails: CoinDetailsReducer,
    myCoins: MyCoinsReducer,
    myCoinsForm: MyCoinsFormReducer,
    investment: InvestmentReducer
};
