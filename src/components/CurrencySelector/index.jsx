import React from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function CurrencySelector() {
	const [firstCurrency, setFirstCurrency] = React.useState("");
	const [firstValue, setFirstValue] = React.useState("");
	const [secondCurrency, setSecondCurrency] = React.useState("");
	const [secondValue, setSecondValue] = React.useState("");
	const [allCurrencies, setAllCurrencies] = React.useState([]);

	React.useEffect(() => {
		axios
			.get("https://min-api.cryptocompare.com/data/top/totalvolfull?=limit=10&tsym=USD")
			.then(({ data }) => {
				let res;
				data.Data.map((el) => {
					if (el.CoinInfo.Name === firstCurrency) {
						res = el.RAW.USD.PRICE;
					}
					return res;
				});
				setSecondValue((res * firstValue).toFixed(2));
				const coins = data.Data.map((coin) => {
					const obj = {
						name: coin.CoinInfo.Name,
						fullName: coin.CoinInfo.FullName,
						imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
						price:
							coin.RAW.USD.PRICE >= 1
								? coin.RAW.USD.PRICE.toFixed(0)
								: coin.RAW.USD.PRICE.toFixed(2),
						marketCap: parseInt(coin.RAW.USD.MKTCAP)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
					};
					return obj.name;
				});
				setAllCurrencies(coins);
			});
	}, [firstCurrency, secondCurrency, firstValue]);

	const handleChangeFirst = (event) => {
		setFirstCurrency(event.target.value);
	};

	const handleChangeSecond = (event) => {
		setSecondCurrency(event.target.value);
	};

	return (
		<>
			<Paper
				elevation={2}
				sx={{
					padding: "40px",
				}}
			>
				<div className="inputDiv">
					<TextField
						onChange={(e) => {
							setFirstValue(e.target.value);
						}}
						value={firstValue}
						label="Amount"
						variant="outlined"
						sx={{
							width: "500px",
							marginRight: "10px",
						}}
					/>
					<FormControl fullWidth>
						<InputLabel id="firstCurrency">Currency</InputLabel>
						<Select
							value={firstCurrency}
							label="firstCurrency"
							onChange={handleChangeFirst}
							sx={{
								width: "110px",
							}}
						>
							{allCurrencies.map((el) => {
								return (
									<MenuItem key={el} value={el}>
										{el}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</div>
				<div className="inputDiv">
					<TextField
						value={secondValue && firstValue ? secondValue : ""}
						label="Amount"
						variant="outlined"
						sx={{
							width: "500px",
							marginRight: "10px",
						}}
					/>
					<FormControl fullWidth>
						<InputLabel id="secondCurrency">Currency</InputLabel>
						<Select
							// value={secondCurrency}
							value="USDT"
							label="secondCurrency"
							// onChange={handleChangeSecond}
							sx={{
								width: "110px",
							}}
						>
							{allCurrencies.map((el) => {
								return (
									<MenuItem key={el} value={el}>
										{el}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</div>
			</Paper>
		</>
	);
}
