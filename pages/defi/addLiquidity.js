import { Contract, utils } from "ethers";
import {
  ARKHAMM_DEFI_ABI,
  ARKHAMM_DEFI_ADDRESS,
  ARKHAMM_ICO_ABI,
  ARKHAMM_ICO_ADDRESS,
} from "/constants";

export const addLiquidity = async (
  signer,
  addAKIAmountWei,
  addEtherAmountWei
) => {
  try {

    const tokenContract = new Contract(
      ARKHAMM_ICO_ADDRESS,
      ARKHAMM_ICO_ABI,
      signer
    );

    const exchangeContract = new Contract(
      ARKHAMM_DEFI_ADDRESS,
      ARKHAMM_DEFI_ABI,
      signer
    );

    let tx = await tokenContract.approve(
      ARKHAMM_DEFI_ADDRESS,
      addAKIAmountWei.toString()
    );
    await tx.wait();
    tx = await exchangeContract.addLiquidity(addAKIAmountWei, {
      value: addEtherAmountWei,
    });
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};


export const calculateAKI = async (
  _addEther = "0",
  etherBalanceContract,
  akiTokenReserve
) => {

  const _addEtherAmountWei = utils.parseEther(_addEther);
  const arkhammTokenAmount = _addEtherAmountWei
    .mul(akiTokenReserve)
    .div(etherBalanceContract);
  return arkhammTokenAmount;
};
