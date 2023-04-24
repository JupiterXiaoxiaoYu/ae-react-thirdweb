import {
	useRef,
	useState,
	useEffect
} from 'react';

import { aeternitySDK } from "../utils/aeternity";

/**
 * æternitySDK Hook 
 * 
 * @returns {Object} æpp client
 */
const useAeternitySDK = () => {
	let sdk = useRef();
	const [client, clientReady] = useState(null);

	useEffect(() => {
		(async () => {
			console.log('sdk')
			try {
				sdk.current = await aeternitySDK();

				clientReady(sdk.current);
			} catch (err) {
				console.error("Error fetching aeternitySDK", err);
				clientReady(false)
			}
		})();
  }, [sdk]);

	return client;
}

export default useAeternitySDK;
