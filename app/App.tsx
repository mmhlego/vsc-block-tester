import React, { useState } from "react";
import styled from "styled-components";
import PingItem from "./components/PingItem";
import PrimaryButton from "./components/PrimaryButton";

export const App = () => {
	const [pingAll, setPingAll] = useState<boolean>(false);

	const signalPingAll = () => {
		setPingAll(true);

		setInterval(() => {
			setPingAll(false);
		}, 2000);
	};

	const websites = apiPingWebsites.split(",");
	return (
		<Container>
			<h2> Websites</h2>

			{websites.map((website) => {
				return (
					<PingItem
						key={website}
						website={website}
						pingAll={pingAll}
					/>
				);
			})}

			<PrimaryButton text="Ping All" onClick={signalPingAll} />
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	min-height: calc(100vh - 30px);
	position: relative;

	button {
		position: sticky;
		bottom: 15px;
		margin-top: 15px;
	}
`;
