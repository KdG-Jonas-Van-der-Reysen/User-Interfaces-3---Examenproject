import { useLocalStorage } from "usehooks-ts";
import SettingsContext from './SettingsContext';

interface ISettingsProviderProps {
    children: React.ReactNode;

}

export default function SettingsContextProvider({children}: ISettingsProviderProps) {
    const [showNames, setShowNames] = useLocalStorage('show-names', true)

    const toggleShowNames = () => setShowNames(!showNames)
    return (
        <SettingsContext.Provider value={{showNames, toggleShowNames}}>
            {children}
        </SettingsContext.Provider>
    )
}