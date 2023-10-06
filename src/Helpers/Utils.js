export const copy = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(err => {console.error('Failed to write clipboard contents: ', err)});
  } else {
    alert("Clipboard API not available");
  }
  }

  export const isWrongNetwork = (chain) => {
    if (chain == null) return false
    const supportedNetworks = [421613, 43113, 97, 11155111, 4002, 10200, 1287, 420, 80001, 1442, 280]
    return !supportedNetworks.includes(chain.id)
  }
  
  export const isAvailableFunds = (searcher) => {
    if (searcher == null) return false
    if (parseInt(searcher.availableFunds) === 0) return false
    return true
  }

  export const saveToLocalStorage = (key, value) => {

    if (typeof window === 'undefined') {
      return null;
    }
  
    try {
      const serializedState = JSON.stringify(value);
      window.localStorage.setItem(key, serializedState);
    } catch (err) {
      console.log(err);
    }
  }

  export const loadFromLocalStorage = (key) => {
    if (typeof window === 'undefined') {
      return null;
    }
  
    try {
      const serializedState = window.localStorage.getItem(key);
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

