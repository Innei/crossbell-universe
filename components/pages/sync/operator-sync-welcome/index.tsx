import React from "react";

import {
	useAccountCharacter,
	useAccountState,
	useCharacterHasOperator,
	useConnectModal,
	useToggleCharacterOperator,
} from "@/components/connectkit";
import {
	OPERATOR_ADDRESS,
	useActivateCharacter,
} from "@/utils/apis/operator-sync";
import { useLoginChecker } from "@/utils/wallet/hooks";

import { SNSIcons } from "./sns-icons";
import { Scenes } from "./scenes";

export default function OperatorSyncWelcome() {
	const ssrReady = useAccountState((s) => s.ssrReady);
	const { data: character } = useAccountCharacter();
	const { validate } = useLoginChecker();
	const activate = useActivateCharacter(character?.characterId);
	const [{ toggleOperator }] = useToggleCharacterOperator(OPERATOR_ADDRESS);
	const { hasOperator } = useCharacterHasOperator(OPERATOR_ADDRESS);
	const connectModal = useConnectModal();

	const handleStart = React.useCallback(async () => {
		if (character?.characterId && validate()) {
			await activate.mutateAsync();

			if (!hasOperator) {
				await toggleOperator();
			}
		} else if (ssrReady) {
			connectModal.show();
		}
	}, [
		ssrReady,
		hasOperator,
		validate,
		character,
		activate,
		toggleOperator,
		connectModal,
	]);

	return (
		<div className="relative z-0 pt-70px pb-100px">
			<SNSIcons />
			<Scenes onStart={handleStart} />
		</div>
	);
}
