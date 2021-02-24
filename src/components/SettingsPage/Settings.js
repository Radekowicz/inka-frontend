import React, {useState, useRef, useEffect} from 'react';
import { Button } from "../Button/Button";
import Editable from "./Editable"
 

function Settings() {

    const [task, setTask] = useState("")


    return (
        <div>
            Edytuj rodzaje wizyt
            <Editable
                text={task}
                placeholder="Write a task name"
                type="input"
            >
                <input
                    type="text"
                    name="task"
                    placeholder="Write a task name"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
            </Editable>
        </div>
    )
}

export default Settings
