import { Contract } from "ethers";
import {
  ARKHAMM_DEFI_ABI,
  ARKHAMM_DEFI_ADDRESS,
  ARKHAMM_ICO_ABI,
  ARKHAMM_ICO_ADDRESS,
} from "/constants";


export const getEtherBalance = async (
  provider,
  address,
  contract = false
) => {
  try {

    if (contract) {
      const balance = await provider.getBalance(ARKHAMM_DEFI_ADDRESS);
      return balance;
    } else {
      const balance = await provider.getBalance(address);
      return balance;
    }
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const getAKITokensBalance = async (provider, address) => {
  try {
    const tokenContract = new Contract(
      ARKHAMM_ICO_ADDRESS,
      ARKHAMM_ICO_ABI,
      provider
    );
    const balanceOfArkhammTokens = await tokenContract.balanceOf(address);
    return balanceOfArkhammTokens;
  } catch (err) {
    console.error(err);
  }
};


export const getLPTokensBalance = async (provider, address) => {
  try {
    const exchangeContract = new Contract(
      ARKHAMM_DEFI_ADDRESS,
      ARKHAMM_DEFI_ABI,
      provider
    );
    const balanceOfLPTokens = await exchangeContract.balanceOf(address);
    return balanceOfLPTokens;
  } catch (err) {
    console.error(err);
  }
};


export const getReserveOfAKITokens = async (provider) => {
  try {
    const exchangeContract = new Contract(
      ARKHAMM_DEFI_ADDRESS,
      ARKHAMM_DEFI_ABI,
      provider
    );
    const reserve = await exchangeContract.getReserve();
    return reserve;
  } catch (err) {
    console.error(err);
  }
};
