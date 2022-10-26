import React, {FC} from 'react';
import ReactDOM from 'react-dom/client';
import {MainWindow} from "components-stories/types/main";
import {ButtonStory} from "../../types/dev/button";

const stories = {ButtonStory}

const App:FC = () => {
    return(<div>
        <MainWindow stories={stories}/>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
