import { Contract } from "ethers";
import {
  ARKHAMM_DEFI_ABI,
  ARKHAMM_DEFI_ADDRESS,
  ARKHAMM_ICO_ABI,
  ARKHAMM_ICO_ADDRESS,
} from "/constants";


export const getAmountOfTokensReceivedFromSwap = async (
  _swapAmountWei,
  provider,
  ethSelected,
  ethBalance,
  reservedAKI
) => {

  const exchangeContract = new Contract(
    ARKHAMM_DEFI_ADDRESS,
    ARKHAMM_DEFI_ABI,
    provider
  );
  let amountOfTokens;

  if (ethSelected) {
    amountOfTokens = await exchangeContract.getAmountOfTokens(
      _swapAmountWei,
      ethBalance,
      reservedAKI
    );
  } else {

    amountOfTokens = await exchangeContract.getAmountOfTokens(
      _swapAmountWei,
      reservedAKI,
      ethBalance
    );
  }

  return amountOfTokens;
};


export const swapTokens = async (
  signer,
  swapAmountWei,
  tokenToBeRecievedAfterSwap,
  ethSelected
) => {
  const exchangeContract = new Contract(
    ARKHAMM_DEFI_ADDRESS,
    ARKHAMM_DEFI_ABI,
    signer
  );
  const tokenContract = new Contract(
    ARKHAMM_ICO_ADDRESS,
    ARKHAMM_ICO_ABI,
    signer
  );
  let tx;

  if (ethSelected) {
    tx = await exchangeContract.ethToarkhammToken(
      tokenToBeRecievedAfterSwap,
      {
        value: swapAmountWei,
      }
    );
  } else {

    tx = await tokenContract.approve(
      ARKHAMM_DEFI_ADDRESS,
      swapAmountWei.toString()
    );
    await tx.wait();
    tx = await exchangeContract.arkhammTokenToEth(
      swapAmountWei,
      tokenToBeRecievedAfterSwap
    );
  }
  await tx.wait();
};
