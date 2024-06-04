'use client';
import React from 'react';
import format from 'date-fns/format';

function Clock() {
    const [time, setTime] = React.useState(null);

    React.useEffect(() => {
        const intervalId = window.setInterval(() => {
            setTime(new Date());
        }, 50);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    return (
        // ERROR: on server it will render <p></p>, but on client after initial render it will be <p><span>Please wait...</span></p> - different layouts
        // <p className="clock">{time ? format(time, 'hh:mm:ss.S a') : <span>Please wait...</span>}</p>
        <p className="clock">{time ? format(time, 'hh:mm:ss.S a') : '———'}</p>
        // FIX: second possible fix: <p className="clock" suppressHydrationWarning>{format(time, 'hh:mm:ss.S a')}</p> (only for one level deep, no nested elements)
        // INFO: https://legacy.reactjs.org/docs/dom-elements.html#suppresshydrationwarning
    );
}

export default Clock;
