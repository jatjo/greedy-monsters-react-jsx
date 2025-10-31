import {useState, createContext} from "react";

export const MonsterConfigurationContext = createContext({});

export const MonsterConfigurationProvider = ({children}) => {
    const [monsterConfig, setMonsterConfig] = useState(5);

    const handleMonsterConfigChange = (monsterConfig) => {
        setMonsterConfig(monsterConfig);
    };

    return (
        <MonsterConfigurationContext.Provider value={{monsterConfig, handleMonsterConfigChange}}>
            {children}
        </MonsterConfigurationContext.Provider>
    );
}