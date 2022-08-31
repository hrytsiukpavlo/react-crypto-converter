import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function CurrencySelector() {
	const [firstCurrency, setFirstCurrency] = useState("");
	const [firstValue, setFirstValue] = useState("");
	const [secondCurrency, setSecondCurrency] = useState("");
	const [secondValue, setSecondValue] = useState("");

	const [fromFirst, setFromFirst] = useState(false);

	const [coins, setCoins] = useState([]);

	useEffect(() => {
		axios
			.get("https://min-api.cryptocompare.com/data/top/totalvolfull?=limit=10&tsym=USD")
			.then(({ data }) => {
				const result = data.Data.map((coin) => {
					return {
						name: coin.CoinInfo.Name,
						price:
							coin.RAW.USD.PRICE >= 1
								? coin.RAW.USD.PRICE.toFixed(0)
								: coin.RAW.USD.PRICE.toFixed(2),
					};
				});
				setCoins(result);
				if (result.length) {
					setFirstCurrency(result[0].name);
					setSecondCurrency(result[0].name);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	useEffect(() => {
		if (firstCurrency && fromFirst) {
			if (secondCurrency) {
				const firstCoinPrice = coins.find((coin) => coin.name === firstCurrency)?.price;
				const secondCoinPrice = coins.find((coin) => coin.name === secondCurrency)?.price;
				setSecondValue(
					((Number(firstCoinPrice) * Number(firstValue)) / Number(secondCoinPrice)).toFixed(2)
				);
			} else {
				const res = coins.find((coin) => coin.name === firstCurrency)?.price;
				setSecondValue((Number(res) * Number(firstValue)).toFixed(2));
			}
		}
	}, [firstValue, coins, firstCurrency, secondCurrency, fromFirst]);

	useEffect(() => {
		if (secondCurrency && !fromFirst) {
			if (firstCurrency) {
				const firstCoinPrice = coins.find((coin) => coin.name === secondCurrency)?.price;
				const secondCoinPrice = coins.find((coin) => coin.name === firstCurrency)?.price;

				setFirstValue(((firstCoinPrice / secondCoinPrice) * Number(secondValue)).toFixed(2));
			} else {
				const res = coins.find((coin) => coin.name === secondCurrency)?.price;
				setFirstValue((Number(res) * Number(secondValue)).toFixed(2));
			}
		}
	}, [secondValue, coins, secondCurrency, firstCurrency, fromFirst]);

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
							setFromFirst(true);
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
							{coins.map((el) => {
								return (
									<MenuItem key={el.name} value={el.name}>
										{el.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</div>
				<div className="inputDiv">
					<TextField
						value={secondValue && firstValue ? secondValue : "0.00"}
						label="Amount"
						variant="outlined"
						sx={{
							width: "500px",
							marginRight: "10px",
						}}
						onChange={(e) => {
							setFromFirst(false);
							setSecondValue(e.target.value);
						}}
					/>
					<FormControl fullWidth>
						<InputLabel id="secondCurrency">Currency</InputLabel>
						<Select
							// value={secondCurrency}
							value={secondCurrency}
							label="secondCurrency"
							onChange={handleChangeSecond}
							sx={{
								width: "110px",
							}}
						>
							{coins.map((el) => {
								return (
									<MenuItem key={el.name} value={el.name}>
										{el.name}
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
