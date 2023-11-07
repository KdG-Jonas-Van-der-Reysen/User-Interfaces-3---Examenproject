
interface IconTextProps {
    children: React.ReactNode;
}
export function IconText({children}: IconTextProps) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                height: "30px",
            }}
        >
            {children}
        </div>
    );
}