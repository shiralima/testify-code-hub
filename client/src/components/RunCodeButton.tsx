import { FC, useEffect, useState } from 'react';

export const RunCodeButton: FC = () => {

    const [codeText, setCodeText] = useState();

    useEffect(() => {

        console.log('codeText: change', codeText);
    }, [codeText])

    const onClickRunCodeBtn = (event: any) => {
        
    }

    return (
        <>
            <button onClick={onClickRunCodeBtn}></button>
        </>
    );
};

