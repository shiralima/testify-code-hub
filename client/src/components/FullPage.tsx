import { FC, useState } from 'react';
import { fc } from 'fast-check';

export const FullPage: FC = () => {
    const [codeText, setCodeText] = useState("");
    const [testsCodeText, setTestsCodeText] = useState("");
    const [output, setOutput] = useState<string | null>(null);
    const [testsOutput, setTestsOutput] = useState<string | null>(null);

    const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCodeText(event.target.value);
    }

    const getJsDoc = () => {
        return codeText.match(/\/\*\*([\s\S]*?)\*\//)?.[0] || null;
    }


    const extractFunctions = (code: string) => {
        const functionRegex = /function\s+([^\s(]+)\s*\([^)]*\)\s*{[^}]*}/g;
        const functions = [];
        let match;

        while ((match = functionRegex.exec(code)) !== null) {
            functions.push(match[0]);
        }

        return functions;
    }

    const onClick = () => {
        const jsDoc = getJsDoc();
        if (!jsDoc) {
            alert("Missing JSDoc comments");
            return;
        }

        const functions = extractFunctions(codeText);
        if (!functions || functions.length === 0) {
            alert("No functions found in the code");
            return;
        }

        try {
            let finalOutput = "";
            functions.forEach(func => {
                const f = new Function(`return ${func}`)();
                const functionResult = f();
                finalOutput += (functionResult !== undefined ? functionResult : "no res") + '\n';
            });
            setOutput(finalOutput.trim());
        } catch (error) {
            console.log('error: ', error);
            setOutput(`Error: ${error.message}`);
        }
    }

    const onClickCompilationTests = () => {
        const functions = extractFunctions(codeText);
        if (!functions || functions.length === 0) {
            alert("No functions found in the code, check again all functions declarations");
            return;
        }

        functions.forEach(func => {
            try {
                const f = new Function(`return ${func}`)();
                f();
            } catch (error) {
                setTestsOutput(`Error while compile code: ${error.message}`);
            }
        });
    }

    const onClickCreateTests = () => {
        onClickCompilationTests();
        const jsDoc = getJsDoc();
        if (!jsDoc) {
            alert("Missing JSDoc comments");
            return;
        }

        const functions = extractFunctions(codeText);

        functions.forEach(func => {

        })
    }

    return (
        <>
            <textarea
                value={codeText}
                onChange={onChangeText}
                placeholder="Write code with JSDoc comments"
            />
            <button
                onClick={onClick}
            >
                Run
            </button>
            <button
                onClick={onClickCompilationTests}
            >
                Compilation Tests
            </button>
            {output && <pre>{output}</pre>}
            <textarea
                value={testsCodeText}
                onChange={onChangeText}
                placeholder="Write tests here"
            />
            <button
                onClick={onClickCreateTests}
            >
                Create Tests
            </button>
            {testsOutput && <pre>{testsOutput}</pre>}
        </>
    );
};
