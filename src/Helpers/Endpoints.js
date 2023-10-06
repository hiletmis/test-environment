import { PREPAYMENT_DEPOSIT_CONTRACT_ADDRESS } from "../../data/getContracts";

export const GetConfiguration = ({setResponse, setError}) => {
    fetch("https://oev.api3dev.com/api/configuration")
    .then((response) => response.json())
    .then((data) => {
        setResponse(data);
    })
    .catch((error) => {
        setError(error);
    });

}

const defaultParams = ({address, endpoint}) => {
    const validUntil = new Date();
    validUntil.setMinutes(validUntil.getMinutes() + 5);

    return {
        searcherAddress: address,
        validUntil: validUntil,
        prepaymentDepositoryChainId: 11155111,
        prepaymentDepositoryAddress: PREPAYMENT_DEPOSIT_CONTRACT_ADDRESS,
        requestType: 'API3 OEV Relay, ' + endpoint,
    }
}

const sortObject = (payload, setPayload, setMessage) => {
    setPayload(payload);
    const sorted = JSON.stringify(payload, Object.keys(payload).sort());
    setMessage(sorted);
}

export const POST = ({setResponse, setError, endpoint, payload}) => {
    fetch("https://oev.api3dev.com/api/" + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((data) => {
        setResponse(data);
    })
    .catch((error) => {
        setError(error);
    });
}

export const PostStatus = ({address, setPayload, setMessage}) => {
    const endpoint = "status"
    let payload = defaultParams({address, endpoint})
    sortObject(payload, setPayload, setMessage);
}

export const PostBidsInfo = ({address, bidId, setPayload, setMessage}) => {
    const endpoint = "/bids/info"
    let payload = defaultParams({address, endpoint})

    payload.id = bidId;
    sortObject(payload, setPayload, setMessage);
}

export const PostBidsList = ({address, cursor="", sortDirection="asc", setPayload, setMessage}) => {
    const endpoint = "/bids/list"
    let payload = defaultParams({address, endpoint})

    payload.cursor = cursor;
    payload.sortDirection = sortDirection;

    sortObject(payload, setPayload, setMessage);
}

export const PostBidsCancel = ({address, bid, setPayload, setMessage}) => {
    const endpoint = "/bids/cancel"
    let payload = defaultParams({address, endpoint})

    const bids=[bid]
    const sortedBids = JSON.stringify(Object.values(bids).sort());

    payload.bids = bids;
    setPayload(payload);

    const sorted = JSON.stringify(payload, Object.keys(payload).sort());
    const merged = sorted.replace('[]', sortedBids);

    setMessage(merged);
}

export const PostBidsPlace = ({address, bid, setPayload, setMessage}) => {
    const endpoint = "/bids/place"
    let payload = defaultParams({address, endpoint})

    const bids=[bid]
    const sortedBids = JSON.stringify(Object.values(bids).sort());

    payload.bids = bids;
    setPayload(payload);

    const sorted = JSON.stringify(payload, Object.keys(payload).sort());
    const merged = sorted.replace('[{}]', sortedBids);
    setMessage(merged);
}

export const PostAuctionsInfo = ({address, bidId, setPayload, setMessage}) => {
    const endpoint = "/auctions/info"
    let payload = defaultParams({address, endpoint})

    payload.id = bidId;
    sortObject(payload, setPayload, setMessage);
}

export const PostAuctionsList = ({address, cursor="", sortDirection="asc", setPayload, setMessage}) => {
    const endpoint = "/auctions/list"
    let payload = defaultParams({address, endpoint})

    payload.cursor = cursor;
    payload.sortDirection = sortDirection;

    sortObject(payload, setPayload, setMessage);
}

export const PostWithdrawalsList = ({address, setPayload, setMessage}) => {
    const endpoint = "/withdrawals/list"
    let payload = defaultParams({address, endpoint})
    sortObject(payload, setPayload, setMessage);
}

export const PostWithdrawalsRequest = ({address, setPayload, setMessage}) => {
    const endpoint = "/withdrawals/request"
    let payload = defaultParams({address, endpoint})
    sortObject(payload, setPayload, setMessage);
}
