import { IUser } from '@/logic/services/user/ServiceUsers'
import styles from './CodeList.module.css'
import { IRaffledCode } from '@/logic/services/raffledcodes/ServiceRaffledCodes'

interface CodeListProps {
    user: IUser
}

export default function CodeList(props: CodeListProps) {

    const { raffledCodes } = props.user

    const renderCards = () => {
        return raffledCodes.map((elem: IRaffledCode, i: any) => {
            return (
                <div>
                    {elem.raffleCode}
                </div>
            )
        })
    }

    return (
        <div>
            <h4>Lista de códigos</h4>
            <div>
                {renderCards()}
            </div>
        </div>
    )
}
