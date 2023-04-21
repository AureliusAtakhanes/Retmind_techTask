import { useState } from 'react';
import data from '../database/data.json';
import './Main.css';

function Main() {
    const [storesData, setStoresData] = useState(data);

    function handleInputChange(inputEvent, storeIndex, monthIndex) {
        const modifiedStore = { ...storesData[storeIndex] };
        modifiedStore.months[monthIndex].value = +inputEvent.target.value;
        const updatedStoresData = [...storesData];
        updatedStoresData[storeIndex] = modifiedStore;
        setStoresData(updatedStoresData);
    }

    const totalByMonths = Array.from(
        { length: 12 },
        (_, i) => storesData.reduce((acc, current) => acc + +current.months[i].value, 0)
    );
    const totalOfTotals = totalByMonths.reduce((acc, current) => acc + current, 0);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className='title'>Store</th>
                        {Array.from({ length: 12 }, (_, i) => (
                            <th key={i}>{i + 1}</th>
                        ))}
                        <th><b style={{ textTransform: 'uppercase' }}>Total</b></th>
                    </tr>
                </thead>
                <tbody>
                    {storesData.map((store, storeIndex) => (
                        <tr key={store.store.id}>
                            <td>{store.store.name}</td>
                            {store.months.map((month, monthIndex) => (
                                <td key={month.id}>
                                    <input
                                        name='name'
                                        value={month.value || ''}
                                        type='text'
                                        placeholder='input'
                                        onChange={(inputEvent) => handleInputChange(inputEvent, storeIndex, monthIndex)}
                                    />
                                </td>
                            ))}
                            <td>{store.months.reduce((acc, current) => acc + current.value, 0)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td> <b style={{ textTransform: 'uppercase' }}>Totals</b></td>
                        {totalByMonths.map((month, index) => (
                            <td key={index}>{month}</td>
                        ))}
                        <td><b>{totalOfTotals}</b></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Main;
