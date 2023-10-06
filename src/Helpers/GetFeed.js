const Hero = ({dataFeedId, setBeaconData}) => { 
    
    fetch("https://pool.nodary.io/0xc52EeA00154B4fF1EbbF8Ba39FDe37F1AC3B9Fd4")
    .then((response) => response.json())
    .then((data) => {
      if (data.count > 0) {
        const hashKey = dataFeedId;
        const beaconData = data.data[hashKey];
        setBeaconData(beaconData);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default Hero;




