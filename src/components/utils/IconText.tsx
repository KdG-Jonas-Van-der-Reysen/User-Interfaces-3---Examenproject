
interface IconTextProps {
    children: React.ReactNode;
}
export function IconText({children}: IconTextProps) {
    return (
        <span
            style={{
                display: "flex",
                alignItems: "center",
                height: "30px",
                margin: "5px 0 0",
            }}
        >
            {children}
        </span>
    );
}