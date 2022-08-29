import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./index.css";
import CoinsTable from "./components/CoinsTable";
import CurrencySelector from "./components/CurrencySelector";

function App() {
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
						<CoinsTable />
					</Grid>
					<Grid item xs={4}>
						<CurrencySelector />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default App;
