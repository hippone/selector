// App.tsx
import React, {useState} from 'react';
import {cards} from './data';
import {Card, CardPayloadMap} from './types';
import {postFetch} from "./api.ts";
import './index.scss';
import CardComponent from "./CardComponent.tsx";

const App: React.FC = () => {
    const [listA, setListA] = useState<Card[]>(cards.sort((a, b) => b.date - a.date));
    const [listB, setListB] = useState<Card[]>([]);

    const moveToListB = (card: Card) => {
        setListA(listA.filter(c => c.id !== card.id));
        setListB([...listB, card].sort((a, b) => b.date - a.date));
    };

    const moveToListA = (card: Card) => {
        setListB(listB.filter(c => c.id !== card.id));
        setListA([...listA, card].sort((a, b) => b.date - a.date));
    };

    const transformListB = (list: Card[]): CardPayloadMap => {
        return list.reduce((acc, card) => {
            acc[card.key] = {id: card.id, date: card.date};
            return acc;
        }, {} as CardPayloadMap);
    };

    const handleSubmit = () => {
        const payload = transformListB(listB);

        postFetch(payload)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    };

    return (
        <main className={'content'}>
            <div className={'selector'}>
                <div className={'selector-item'}>
                    <ul className={'selector-item-ul'}>
                        {listA.map(card => (
                            <CardComponent key={card.id} card={card} onAction={moveToListB} actionLabel="ADD"/>
                        ))}
                    </ul>
                </div>
                <div className={'selector-item'}>
                    <ul className={'selector-item-ul'}>
                        {listB.map(card => (
                            <CardComponent key={card.id} card={card} onAction={moveToListA} actionLabel="MINUS"/>
                        ))}
                    </ul>
                </div>
            </div>
            <footer className={'bottom'}>
                <button className={'bottom-btn btn'} disabled={listB.length === 0} onClick={handleSubmit}>Submit
                </button>
            </footer>
        </main>
    );
};

export default App;
