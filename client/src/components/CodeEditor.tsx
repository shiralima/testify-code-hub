import { FC, useEffect, useState } from 'react';

export const CodeEditor: FC = () => {

    const [codeText, setCodeText] = useState();

    useEffect(() => {

        console.log('codeText: change', codeText);
    }, [codeText])

    const onChangeText = (event: any) => {
        setCodeText(event.target.value);
    }

    return (
        <>
            <textarea onChange={onChangeText}>write code</textarea>
        </>
    );
};

