export default function handler(req, res) {

  const arkhammGameTokenId = req.query.tokenId;


  res.status(200).json({
    name: "Arkhamm Game Tag #" + arkhammGameTokenId,
    description: "Arkhamm Game NFT",
    image: "https://gateway.pinata.cloud/ipfs/QmYgczxkjXQ1hheP9c5XcQ3tmQG1JZsZVLZPjSv4542xa1",
  });
}

  const arkhammTokenId = req.query.tokenId;


  res.status(200).json({
    name: "Arkhamm #" + arkhammTokenId,
    description: "Arkhamm NFT",
    image: "https://gateway.pinata.cloud/ipfs/QmNc3XXN7xm4omWwHWXaGGeh5jBJY6vwrWT6dH6K8YGpV7",
  });
}
