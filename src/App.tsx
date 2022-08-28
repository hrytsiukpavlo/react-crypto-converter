import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./index.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type TCoin = {
	name: string;
	fullName: string;
	imageUrl: string;
	price: number;
	marketCap: string;
};

function App() {
	const [age, setAge] = React.useState("");
	const [allCoins, setAllCoins] = useState<TCoin[]>([]);

	useEffect(() => {
		axios
			.get("https://min-api.cryptocompare.com/data/top/totalvolfull?=limit=10&tsym=USD")
			.then(({ data }) => {
				const coins: TCoin[] = data.Data.map((coin: any) => {
					const obj: TCoin = {
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
					return obj;
				});
				setAllCoins(coins);
			});
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	}));

	return (
		<div className="App">
			<Container
				maxWidth="lg"
				sx={{
					padding: "100px",
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="center">Icon</TableCell>
										<TableCell align="center">Ticker</TableCell>
										<TableCell align="center">Name</TableCell>
										<TableCell align="center">Price</TableCell>
										<TableCell align="center">Capitalization</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allCoins.map((coin) => (
										<TableRow
											key={coin.name}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell
												component="th"
												scope="row"
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												{
													<img
														src={coin.imageUrl}
														alt="Coin icon"
														style={{ width: "25px", height: "25px", borderRadius: "30px" }}
													/>
												}
											</TableCell>
											<TableCell align="center">{coin.name}</TableCell>
											<TableCell align="center">{coin.fullName}</TableCell>
											<TableCell align="center">${coin.price}</TableCell>
											<TableCell align="center">${coin.marketCap}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={4}>
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
									<InputLabel id="demo-simple-select-label">Currency</InputLabel>
									<Select
										value={age}
										label="Currency"
										onChange={handleChange}
										sx={{
											width: "110px",
										}}
									>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
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
									<InputLabel id="demo-simple-select-label">Currency</InputLabel>
									<Select
										value={age}
										label="Currency"
										onChange={handleChange}
										sx={{
											width: "110px",
										}}
									>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</FormControl>
							</div>
							<Typography variant="h5" component="h5">
								123,2 USD
							</Typography>
						</Item>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default App;
