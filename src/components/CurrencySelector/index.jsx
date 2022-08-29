import React from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function CurrencySelector() {
	const [ageFirst, setAgeFirst] = React.useState("");
	const [ageSecond, setAgeSecond] = React.useState("");
	const [allCurrencies, setAllCurrencies] = React.useState([]);

	React.useEffect(() => {
		axios
			.get("https://min-api.cryptocompare.com/data/top/totalvolfull?=limit=10&tsym=USD")
			.then(({ data }) => {
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
	}, []);

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	}));

	const handleChangeFirst = (event) => {
		setAgeFirst(event.target.value);
	};

	const handleChangeSecond = (event) => {
		setAgeSecond(event.target.value);
	};

	return (
		<>
			<Item elevation={2}>
				<div className="inputDiv">
					<TextField
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
							value={ageFirst}
							label="firstCurrency"
							onChange={handleChangeFirst}
							sx={{
								width: "110px",
							}}
						>
							{allCurrencies.map((el) => {
								return <MenuItem value={el}>{el}</MenuItem>;
							})}
						</Select>
					</FormControl>
				</div>
				<div className="inputDiv">
					<TextField
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
							value={ageSecond}
							label="secondCurrency"
							onChange={handleChangeSecond}
							sx={{
								width: "110px",
							}}
						>
							{allCurrencies.map((el) => {
								return <MenuItem value={el}>{el}</MenuItem>;
							})}
						</Select>
					</FormControl>
				</div>
			</Item>
		</>
	);
}
