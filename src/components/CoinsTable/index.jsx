import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classnames from "classnames";

export default function CoinsTable() {
	const [allCoins, setAllCoins] = useState([]);
	const prevCoins = useRef();

	const getCoins = useCallback(() => {
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
					return obj;
				});
				setAllCoins(coins);
			});
	}, []);

	useEffect(() => {
		prevCoins.current = allCoins;
	}, [allCoins]);

	useEffect(() => {
		getCoins();
		let timerId = setInterval(getCoins, 2000);
		return () => {
			clearInterval(timerId);
		};
	}, [getCoins]);

	return (
		<>
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
						{allCoins.map((coin, index) => (
							<TableRow key={coin.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
								<TableCell
									className={classnames({
										red: prevCoins.current.length && coin.price < prevCoins.current[index].price,
										green: prevCoins.current.length && coin.price > prevCoins.current[index].price,
										// red: true,
										// green: true,
										usual:
											prevCoins.current.length && coin.price === prevCoins.current[index].price,
									})}
									align="center"
								>
									${coin.price}
								</TableCell>
								<TableCell align="center">${coin.marketCap}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
