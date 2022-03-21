import { Contract, providers, utils, BigNumber } from "ethers";
import {
  ARKHAMM_DEFI_ABI,
  ARKHAMM_DEFI_ADDRESS,
} from "/constants";

export const removeLiquidity = async (signer, removeLPTokensWei) => {
  const exchangeContract = new Contract(
    ARKHAMM_DEFI_ADDRESS,
    ARKHAMM_DEFI_ABI,
    signer
  );
  const tx = await exchangeContract.removeLiquidity(removeLPTokensWei);
  await tx.wait();
};


export const getTokensAfterRemove = async (
  provider,
  removeLPTokenWei,
  _ethBalance,
  arkhammTokenReserve
) => {
  try {
    const exchangeContract = new Contract(
      ARKHAMM_DEFI_ADDRESS,
      ARKHAMM_DEFI_ABI,
      provider
    );
    const _totalSupply = await exchangeContract.totalSupply();
    const _removeEther = _ethBalance
      .mul(removeLPTokenWei)
      .div(_totalSupply);
    const _removeAKI = arkhammTokenReserve
      .mul(removeLPTokenWei)
      .div(_totalSupply);
    return {
      _removeEther,
      _removeAKI,
    };
  } catch (err) {
    console.error(err);
  }
};
