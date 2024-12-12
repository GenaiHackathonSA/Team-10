import { useEffect, useState } from 'react';
import UserService from '../../services/userService';
import { Link } from 'react-router-dom';
import '../../assets/styles/transactionList.css';

function TransactionList({ list }) {
    const [exchangeRates, setExchangeRates] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState('usd');

    useEffect(() => {
        const getExchangeRates = async () => {
            await UserService.get_exchange_rates().then(
                (response) => {
                    setExchangeRates(response.data);
                },
                (error) => {
                    console.error("Failed to fetch exchange rates: Try again later!");
                }
            );
        };

        getExchangeRates();
    }, []);

    const convertAmount = (amount, currency) => {
        if (currency === 'usd' || !exchangeRates[currency]) {
            return amount;
        }
        return amount * exchangeRates[currency];
    };

    console.log(exchangeRates)

    return (
        <>
            <div className="currency-selector">
                <label htmlFor="currency">Select Currency: </label>
                <select
                    id="currency"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                    {Object.keys(exchangeRates).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            {Object.keys(list).map((date) => (
                <div className='t-box' key={date}>
                    <div className='date'>{formatDate(date)}</div>
                    <div className='t-list'>
                        {list[date].map(t => (
                            <Link to={`/user/editTransaction/${t.transactionId}`} className='t-row' key={t.transactionId}>
                                <div className='t-row-left'>
                                    <p>{t.categoryName}</p>
                                    <p>{t.description}</p>
                                </div>
                                <div className='t-row-right'>
                                    <p>
                                        {t.transactionType === 1 ? "- " : "+ "}
                                        {convertAmount(t.amount, selectedCurrency).toFixed(2)} {selectedCurrency.toUpperCase()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}

function formatDate(dateString) {
    if (["Today", "Yesterday"].includes(dateString)) {
        return dateString;
    }
    const date = new Date(dateString);
    const y = date.getFullYear();
    const m = date.toLocaleDateString('en-US', { month: 'long' });
    const d = date.getDate();
    return d + " " + m + " " + y;
}

export default TransactionList;
