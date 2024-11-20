import ServiceLayoutCSS from '../styles/serviceLayout.module.css'

export function ServiceLayout(props: {subtitle: string, children: React.ReactNode}) {
    return (
        <>
            <div className={ServiceLayoutCSS.header}>
                <h1 className={ServiceLayoutCSS.bigHeaderText}>is.hyperfocus.ing</h1>
                <h2 className={ServiceLayoutCSS.smallHeaderText}>{props.subtitle}</h2>
            </div>
            {props.children}
        </>
    )
}