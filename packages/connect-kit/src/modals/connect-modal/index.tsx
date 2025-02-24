import React from "react";
import { DynamicContainer, DynamicContainerContent } from "@crossbell/ui";

import { BaseModal, Congrats } from "../../components";
import { SignInWithWallet, OPSignSettings } from "../../scenes";
import { useConnectedAccount } from "../../hooks";

import { Scene, SceneKind } from "./types";
import { StoresProvider, useConnectModal, useScenesStore } from "./stores";
import { Header } from "./components/header";

import { AboutWallets } from "./scenes/about-wallets";
import { ConnectKindDifferences } from "./scenes/connect-kind-differences";
import { ConnectWallet } from "./scenes/connect-wallet";
import { DoNotHaveWallet } from "./scenes/do-not-have-wallet";
import { InputEmailToConnect } from "./scenes/input-email-to-connect";
import { InputEmailToRegister1 } from "./scenes/input-email-to-register-1";
import { InputEmailToRegister2 } from "./scenes/input-email-to-register-2";
import { InputEmailToRegister3 } from "./scenes/input-email-to-register-3";
import { InputEmailToResetPassword1 } from "./scenes/input-email-to-reset-password-1";
import { InputEmailToResetPassword2 } from "./scenes/input-email-to-reset-password-2";
import { SelectConnectKind } from "./scenes/select-connect-kind";
import { SelectWalletToConnect } from "./scenes/select-wallet-to-connect";
import { SelectCharacters } from "./scenes/select-characters";
import { MintCharacter } from "./scenes/mint-character";
import { SignInStrategy, useConnectKitConfig } from "../../connect-kit-config";

export { useConnectModal };

export function ConnectModal() {
	const { isActive, hide } = useConnectModal();
	const storeKey = useResetStore();

	return (
		<BaseModal isActive={isActive} onClose={hide}>
			<DynamicContainer>
				<StoresProvider key={storeKey}>
					<Main />
				</StoresProvider>
			</DynamicContainer>
		</BaseModal>
	);
}

function Main() {
	const [currentScene, goTo, setSignInStrategy] = useScenesStore((s) => [
		s.computed.currentScene,
		s.goTo,
		s.setSignInStrategy,
	]);
	const { hide } = useConnectModal();
	const account = useConnectedAccount();
	const { signInStrategy } = useConnectKitConfig();

	React.useEffect(
		() => setSignInStrategy(signInStrategy),
		[signInStrategy, setSignInStrategy]
	);

	React.useEffect(() => {
		if (account?.type === "wallet") {
			const goToSelectCharacters = () =>
				goTo({ kind: SceneKind.selectCharacters });

			const nextStrategies: Record<SignInStrategy, () => void> = {
				simple() {
					if (account.character) {
						hide();
					} else {
						goToSelectCharacters();
					}
				},
				complete() {
					goToSelectCharacters();
				},
			};

			const next = nextStrategies[signInStrategy];

			goTo({
				kind: SceneKind.signInWithWallet,
				signInText: "Sign In (Recommended)",
				afterSignIn: next,
				onSkip: next,
			});
		}
	}, [account?.type, goTo]);

	return (
		<DynamicContainerContent id={currentScene.kind}>
			{renderScene({ scene: currentScene, signInStrategy })}
		</DynamicContainerContent>
	);
}

function renderScene({
	scene,
	signInStrategy,
}: {
	scene: Scene;
	signInStrategy: SignInStrategy;
}) {
	switch (scene.kind) {
		case SceneKind.congrats:
			return <Congrats {...scene} />;
		case SceneKind.selectConnectKind:
			return <SelectConnectKind />;
		case SceneKind.aboutWallets:
			return <AboutWallets />;
		case SceneKind.connectKindDifferences:
			return <ConnectKindDifferences />;
		case SceneKind.selectWalletToConnect:
			return <SelectWalletToConnect />;
		case SceneKind.doNotHaveWallet:
			return <DoNotHaveWallet />;
		case SceneKind.connectWallet:
			return <ConnectWallet {...scene} />;
		case SceneKind.signInWithWallet:
			return (
				<SignInWithWallet
					Header={Header}
					autoSignIn={signInStrategy === "simple"}
					{...scene}
				/>
			);
		case SceneKind.selectCharacters:
			return <SelectCharacters />;
		case SceneKind.opSignSettings:
			return <OPSignSettings Header={Header} {...scene} />;
		case SceneKind.mintCharacter:
			return <MintCharacter {...scene} />;
		case SceneKind.inputEmailToConnect:
			return <InputEmailToConnect />;
		case SceneKind.inputEmailToRegister1:
			return <InputEmailToRegister1 />;
		case SceneKind.inputEmailToRegister2:
			return <InputEmailToRegister2 />;
		case SceneKind.inputEmailToRegister3:
			return <InputEmailToRegister3 />;
		case SceneKind.inputEmailToResetPassword1:
			return <InputEmailToResetPassword1 />;
		case SceneKind.inputEmailToResetPassword2:
			return <InputEmailToResetPassword2 />;
	}
}

function useResetStore() {
	const { isActive } = useConnectModal();
	const keyRef = React.useRef(0);

	React.useMemo(() => {
		if (isActive) {
			keyRef.current += 1;
		}
	}, [isActive]);

	return keyRef.current;
}
