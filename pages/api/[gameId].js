export default function handler(req, res) {

  const arkhammGameTokenId = req.query.tokenId;


  res.status(200).json({
    name: "Arkhamm Game Tag #" + arkhammGameTokenId,
    description: "Arkhamm Game NFT",
    image: "https://gateway.pinata.cloud/ipfs/QmYgczxkjXQ1hheP9c5XcQ3tmQG1JZsZVLZPjSv4542xa1",
  });
}
