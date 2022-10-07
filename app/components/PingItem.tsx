import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FailSvg, OkSvg, RefreshSvg } from "../assets/Icons";
import Ping from "ping-url";

interface Props {
	website: string;
	pingAll: boolean;
}

type Status = "none" | "ok" | "fail" | "loading";

const getStatusIcon = (status: Status) => {
	if (status === "ok") {
		return <OkSvg />;
	}
	if (status === "fail") {
		return <FailSvg />;
	}
	return <></>;
};

export default function PingItem({ website, pingAll }: Props) {
	const [status, setStatus] = useState<Status>("none");

	useEffect(() => {
		if (pingAll) pingWebsite();
	}, [pingAll]);

	const pingWebsite = async () => {
		setStatus("loading");

		// Ping.check(website)
		// 	.then((res) => {
		// 		setStatus(res.status ? "ok" : "fail");
		// 	})
		// 	.catch((err) => {
		// 		setStatus("fail");
		// 	});

		fetch(website, { mode: "no-cors" })
			.then((res) => {
				setStatus("ok");
				// console.log(`${website} Status:`, res);
			})
			.catch((err) => {
				setStatus("fail");
				// console.log(`${website} ERROR:`, err);
			});
	};

	return (
		<Container>
			<Text href={website}>{website}</Text>
			<ButtonsContainer>
				{getStatusIcon(status)}

				<span
					style={{
						cursor: "pointer",
						animation:
							status === "loading"
								? "rotate 2s linear infinite"
								: "none",
					}}
					onClick={pingWebsite}
				>
					<RefreshSvg />
				</span>
			</ButtonsContainer>
		</Container>
	);
}

const Container = styled.div`
	/* height: 35px; */
	padding: 8px 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid var(--vscode-titleBar-activeForeground);
`;

const Text = styled.a`
	color: var(--vscode-titleBar-activeForeground);
	text-decoration: none;
	max-width: calc(100% - 40px);
	inline-size: 100%;
	overflow-wrap: break-word;
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
`;
