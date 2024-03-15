import { Avatar as AntdAvatar } from 'antd'
import { AvatarProps } from 'antd/lib'

type Props = AvatarProps & {
    name: string,
}

const CustomAvatar = ({ name, styles, ...rest }: Props) => {
    return (
        <AntdAvatar
            alt='My Avatar'
            size='small'
            style={{
                backgroundColor: '#87d068',
                display: 'flex',
                alignItems: 'center',
                border: 'none'
            }}
        >
            {name}
        </AntdAvatar>
    )
}

export default CustomAvatar