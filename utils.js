// Check for MetaMask wallet browser extension
const hasEthereum = () => {
  return (
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  );
};

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

module.exports = {
  hasEthereum,
  requestAccount,
};
