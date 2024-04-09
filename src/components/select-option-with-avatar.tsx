import CustomAvatar from "./custom-avatar"
import { Text } from "./text"

type Props = {
    name: string,
    avatarUrl?: string | null,
    shape?: 'square' | 'circle'
}

const SelectOptionWithAvatar = ({ avatarUrl, name, shape }: Props) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <CustomAvatar shape={shape} name={name} src={avatarUrl} />
            <Text >{name}</Text>
        </div>
    )
}

export default SelectOptionWithAvatar