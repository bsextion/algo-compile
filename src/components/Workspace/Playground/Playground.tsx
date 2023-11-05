import React from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from "react-split";
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";

type PlaygroundProps = {
    
};

const Playground:React.FC<PlaygroundProps> = () => {
    
    return <div className='flex flex-col bg-dark-layer-1 relative'>
    <PreferenceNav/>
    <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						value='const a = 1'
						theme={vscodeDark}
						extensions={[javascript()]}
						style={{ fontSize: 16 }}
					/>
        </div>
        <div>
            test cases
        </div>
    </Split>
    </div>
    
}
export default Playground;