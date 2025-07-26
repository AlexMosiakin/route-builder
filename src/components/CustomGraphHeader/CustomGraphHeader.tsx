import { Button } from 'antd'

interface CustomGraphHeaderProps {
    route: {
        from: string
        to: string
    }[]
    notifySuccess: (content: string) => void;
}

export const CustomGraphHeader = ({ route, notifySuccess }: CustomGraphHeaderProps) => {
    const style = {
        wrapper: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '1.65rem',
            zIndex: 5,
        },
    }

    return (
        <div style={style.wrapper as React.CSSProperties}>
            <Button type="primary" onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(route))
                notifySuccess('Route copied to clipboard')
            }}>
                Copy route
            </Button>
        </div>
    )
}
