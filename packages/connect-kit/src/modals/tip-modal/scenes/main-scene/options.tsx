import React from "react";
import { utils } from "ethers";
import { useRefCallback } from "@crossbell/util-hooks";
import { useAccountMiraBalance } from "@crossbell/connect-kit";

import styles from "./options.module.css";
import { FlowerIcon } from "./options.icons";

export type OptionsProps = {
	balance: ReturnType<typeof useAccountMiraBalance>["balance"];
	onSelect: (amount: number) => void;
};

export function Options({ balance, onSelect }: OptionsProps) {
	return (
		<div className={styles.list}>
			{[1, 5, 10].map((a) => (
				<Item key={a} amount={a} balance={balance} onClick={onSelect} />
			))}
		</div>
	);
}

function Item({
	amount,
	balance,
	onClick,
}: {
	amount: number;
	balance: ReturnType<typeof useAccountMiraBalance>["balance"];
	onClick: (amount: number) => void;
}) {
	const handleClick = useRefCallback(() => onClick(amount));

	return (
		<button
			className={styles.item}
			onClick={handleClick}
			disabled={balance?.value.lt(utils.parseEther(`${amount}`))}
		>
			<div className={styles.amount}>
				<FlowerIcon className={styles.flower} />
				<span>{amount} MIRA</span>
			</div>
			<div className={styles.tip}>Tip</div>
		</button>
	);
}
