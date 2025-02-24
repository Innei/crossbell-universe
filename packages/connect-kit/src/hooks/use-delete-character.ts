import { SCOPE_KEY_CHARACTER, SCOPE_KEY_CHARACTERS } from "@crossbell/indexer";

import { useAccountState } from "./account-state";
import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

export const useDeleteCharacter = createAccountTypeBasedMutationHooks<
	void,
	{ characterId: number }
>(
	{
		actionDesc: "setting character handle",
		withParams: false,
		connectType: "wallet",
	},
	() => {
		const { refresh } = useAccountState();
		return {
			async contract({ characterId }, { contract }) {
				return contract.burnCharacter(characterId);
			},

			onSuccess({ queryClient, variables, account }) {
				const { characterId } = variables;

				return Promise.all([
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTER(characterId)),
					queryClient.invalidateQueries(SCOPE_KEY_CHARACTERS(account?.address)),
					refresh(),
				]);
			},
		};
	}
);
