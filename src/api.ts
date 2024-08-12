import { CardPayloadMap } from './types';

export const postFetch = async (payload: CardPayloadMap) => {
    const response = await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    return response.json();
}
