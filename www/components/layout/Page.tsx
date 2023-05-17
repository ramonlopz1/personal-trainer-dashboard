import ForceAuthentication from "../authentication/ForceAuthentication"

interface PageProps {
    externa?: boolean
    children: any
    className?: string
}

export default function Page(props: PageProps) {
    function render() {
        return (
            <div className={`
                flex flex-col min-h-screen
                bg-gradient-to-r from-zinc-900 via-black to-zinc-900
                ${props.className ?? ''}
            `}>
                {props.children}
            </div>
        )
    }

    return props.externa ? render() : (
        <ForceAuthentication>
            {render()}
        </ForceAuthentication>
    )
}
